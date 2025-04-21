import { AccessList } from "./AccessList";
import { ApiLink } from "./ApiLink";

export interface RecordAccessList {
  id: string;
  _links: RecordAccessListLinks;
  _embedded?: {
    [K in Exclude<
      keyof RecordAccessListLinks,
      "self"
    >]?: RecordAccessListLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface RecordAccessListLinks {
  self: ApiLink;
  target: ApiLink<AccessList>;
}
