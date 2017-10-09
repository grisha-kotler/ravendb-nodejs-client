import {SpatialCriteria, SpatialParameterNameGenerator} from "./Spatial/SpatialCriteria";
import {OrderingType, QueryOperator, SearchOperator} from "./QueryLanguage";
import {IParametrizedWhereParams} from "./WhereParams";
import {SpatialUnit} from "./Spatial/SpatialUnit";
import {SpatialRelation} from "./Spatial/SpatialRelation";

export interface IQueryBuilder {
  isDynamicMapReduce: boolean;
  rawQuery(query: string): IQueryBuilder;
  selectFields(fields: string[]): IQueryBuilder;
  selectFields(fields: string[], projections: string[]): IQueryBuilder;
  from(indexName?: string, collectionName?: string): IQueryBuilder;
  getProjectionFields(): string[];
  randomOrdering(seed?: string): IQueryBuilder;
  customSortUsing(typeName: string, descending?: boolean): IQueryBuilder;
  include(path: string): IQueryBuilder;
  usingDefaultOperator(operator: QueryOperator): IQueryBuilder;
  whereEquals(params: IParametrizedWhereParams): IQueryBuilder;
  whereEquals(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  whereNotEquals(params: IParametrizedWhereParams): IQueryBuilder;
  whereNotEquals(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  openSubclause(): IQueryBuilder;
  closeSubclause(): IQueryBuilder;
  negateNext(): IQueryBuilder;
  whereIn(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  whereAllIn(fieldName: string, parameterName: string): IQueryBuilder;
  whereStartsWith(fieldName: string, parameterName: string): IQueryBuilder;
  whereEndsWith(fieldName: string, parameterName: string): IQueryBuilder;
  whereBetween(fieldName: string, fromParameterName: string, toParameterName: string, exact?: boolean): IQueryBuilder;
  whereGreaterThan(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  whereGreaterThanOrEqual(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  whereLessThan(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  whereLessThanOrEqual(fieldName: string, parameterName: string, exact?: boolean): IQueryBuilder;
  whereExists(fieldName: string): IQueryBuilder;
  andAlso(): IQueryBuilder;
  orElse(): IQueryBuilder;
  boost(boost: number): IQueryBuilder;
  fuzzy(fuzzy: number): IQueryBuilder;
  proximity(proximity: number): IQueryBuilder;
  orderBy(field: string, ordering?: OrderingType): IQueryBuilder;
  orderByDescending(field: string, ordering?: OrderingType): IQueryBuilder;
  orderByScore(): IQueryBuilder;
  orderByScoreDescending(): IQueryBuilder;
  search(fieldName: string, searchTermsParameterName: string, operator?: SearchOperator): IQueryBuilder;
  intersect(): IQueryBuilder;
  distinct(): IQueryBuilder;
  groupBy(fieldName: string, ...fieldNames: string[]): IQueryBuilder;
  groupByKey(fieldName: string, projectedName?: string): IQueryBuilder;
  groupBySum(fieldName: string, projectedName?: string): IQueryBuilder;
  groupByCount(projectedName?: string): IQueryBuilder;
  whereTrue(): IQueryBuilder;
  withinRadiusOf(fieldName: string, radiusParameterName: string, latitudeParameterName: string, longitudeParameterName: string, radiusUnits?: SpatialUnit, distErrorPercent?: number): IQueryBuilder;
  spatial(fieldName: string, shapeWktParameterName: string, relation: SpatialRelation, distErrorPercent: number): IQueryBuilder;
  spatial(fieldName: string, criteria: SpatialCriteria, parameterNameGenerator: SpatialParameterNameGenerator): IQueryBuilder;
  orderByDistance(fieldName: string, latitudeParameterName: string, longitudeParameterName: string): IQueryBuilder;
  orderByDistance(fieldName: string, shapeWktParameterName: string): IQueryBuilder;
  orderByDistanceDescending(fieldName: string, latitudeParameterName: string, longitudeParameterName: string): IQueryBuilder;
  orderByDistanceDescending(fieldName: string, shapeWktParameterName: string): IQueryBuilder;
}