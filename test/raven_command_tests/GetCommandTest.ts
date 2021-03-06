/// <reference path="../../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../../node_modules/@types/chai/index.d.ts" />

import {expect} from 'chai';
import * as BluebirdPromise from 'bluebird';
import {RequestExecutor} from "../../src/Http/Request/RequestExecutor";
import {PutDocumentCommand} from "../../src/Database/Commands/PutDocumentCommand";
import {IRavenResponse} from "../../src/Database/RavenCommandResponse";
import {GetDocumentCommand} from "../../src/Database/Commands/GetDocumentCommand";
import {IRavenObject} from "../../src/Typedef/IRavenObject";

describe('DocumentSession', () => {
  let requestExecutor: RequestExecutor;
  let putCommand: PutDocumentCommand, otherPutCommand: PutDocumentCommand;
  let response: IRavenResponse, otherResponse: IRavenResponse;

  beforeEach(function(): void {
    ({requestExecutor} = this.currentTest as IRavenObject);
  });

  beforeEach(async() => {
    putCommand = new PutDocumentCommand('Products/101', {'Name': 'test', '@metadata': {}});
    otherPutCommand = new PutDocumentCommand('Products/10', {'Name': 'test', '@metadata': {}});

    return BluebirdPromise.all([
      requestExecutor.execute(putCommand)
        .then(() => requestExecutor
          .execute(new GetDocumentCommand('Products/101'))
        )
        .then((result: IRavenResponse) => response = result),
      requestExecutor.execute(otherPutCommand)
        .then(() => requestExecutor
          .execute(new GetDocumentCommand('Products/10'))
        )
        .then((result: IRavenResponse) => otherResponse = result)
    ])
  });

  describe('Get()', () => {
    it('document id should be equal after load', () => {
      expect(response.Results[0]['@metadata']['@id']).to.equals('Products/101')
    });

    it('different document ids shouln\'t be equals after load', () => {
      expect(response.Results[0]['@metadata']['@id']).not.to.equals(otherResponse.Results[0]['@metadata']['@id'])
    });

    it('unexisting document loading attempt should return void response', async() => requestExecutor
      .execute(new GetDocumentCommand('product'))
      .then((result) => expect(result).to.be.undefined)
    );
  });
});

