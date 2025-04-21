import { ApiLink } from "./ApiLink";

export interface PagedCollection<T, L = DefaultPagedLinks> {
  items: T[];
  page: number;
  pageSize: number;
  skip: number;
  take: number;
  totalCount: number;
  _links: L;
  _embedded?: {
    [K in Exclude<keyof L, "self">]?: L[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface DefaultPagedLinks {
  self: ApiLink;
  first?: ApiLink;
  prev?: ApiLink;
  next?: ApiLink;
  last?: ApiLink;
}
