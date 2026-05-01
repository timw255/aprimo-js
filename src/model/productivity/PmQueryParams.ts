export interface PmPagingParams {
  limit?: number;
  offset?: number;
}

export type PmQueryParams = PmPagingParams & {
  [key: string]: string | number | boolean | undefined;
};
