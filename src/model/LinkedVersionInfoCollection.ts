import { ApiLink } from "./ApiLink";
import { LinkedVersionInfo } from "./LinkedVersionInfo";

export interface LinkedVersionInfoCollection {
  items: LinkedVersionInfo[];
  page: number;
  pageSize: number;
  skip: number;
  take: number;
  totalCount: number;
  _links: LinkedVersionInfoCollectionLinks;
  _embedded?: {
    [K in Exclude<
      keyof LinkedVersionInfoCollectionLinks,
      "self"
    >]?: LinkedVersionInfoCollectionLinks[K] extends ApiLink<infer R>
      ? R
      : never;
  };
}

export interface LinkedVersionInfoCollectionLinks {
  self: ApiLink;
  first: ApiLink;
  prev: ApiLink;
  next: ApiLink;
  last: ApiLink;
}
