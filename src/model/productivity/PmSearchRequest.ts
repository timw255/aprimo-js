/** Scalar value usable in a PM search field comparison. */
export type PmSearchFieldValue = string | number | boolean;

/**
 * Simple search operand: compare a single field to a value.
 *
 * @example
 * ```ts
 * { fieldName: "name", fieldValue: "Spring Campaign" }
 * ```
 */
export interface PmSearchFieldOperand {
  fieldName: string;
  fieldValue: PmSearchFieldValue;
}

/** Compare a field on a row inside a collection on the searched object. */
export interface PmSearchCollectionFieldOperand extends PmSearchFieldOperand {
  collectionName: string;
}

/** Compare multiple fields on the same row of a collection. */
export interface PmSearchCollectionNestedOperand {
  collectionName: string;
  nested: PmSearchFieldOperand[];
}

/** Any operand shape accepted by the comparison operators. */
export type PmSearchComparisonOperand =
  | PmSearchFieldOperand
  | PmSearchCollectionFieldOperand
  | PmSearchCollectionNestedOperand;

/** Operand used by `isNull` / `isNotNull`. */
export interface PmSearchNullOperand {
  fieldName: string;
  collectionName?: string;
}

/**
 * Search payload for PM `*\/search` endpoints. Combine comparison
 * operators (`equals`, `contains`, range checks) and boolean operators
 * (`and`, `or`, `not`) to build a query tree.
 *
 * @example
 * ```ts
 * const req: PmSearchRequest = {
 *   and: [
 *     { equals: { fieldName: "name", fieldValue: "Spring Campaign" } },
 *     { equals: { fieldName: "activityStateId", fieldValue: 1 } },
 *   ],
 * };
 * ```
 */
export interface PmSearchRequest {
  equals?: PmSearchComparisonOperand;
  contains?: PmSearchComparisonOperand;
  greaterthan?: PmSearchComparisonOperand;
  lessthan?: PmSearchComparisonOperand;
  greaterthanorequalto?: PmSearchComparisonOperand;
  lessthanorequalto?: PmSearchComparisonOperand;
  isNull?: PmSearchNullOperand;
  isNotNull?: PmSearchNullOperand;

  and?: PmSearchRequest[];
  or?: PmSearchRequest[];
  not?: PmSearchRequest;

  [key: string]: unknown;
}
