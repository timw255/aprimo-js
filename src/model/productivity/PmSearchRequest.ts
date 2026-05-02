export type PmSearchFieldValue = string | number | boolean;

export interface PmSearchFieldOperand {
  fieldName: string;
  fieldValue: PmSearchFieldValue;
}

export interface PmSearchCollectionFieldOperand extends PmSearchFieldOperand {
  collectionName: string;
}

export interface PmSearchCollectionNestedOperand {
  collectionName: string;
  nested: PmSearchFieldOperand[];
}

export type PmSearchComparisonOperand =
  | PmSearchFieldOperand
  | PmSearchCollectionFieldOperand
  | PmSearchCollectionNestedOperand;

export interface PmSearchNullOperand {
  fieldName: string;
  collectionName?: string;
}

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
