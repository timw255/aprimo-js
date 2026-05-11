import { AccessList } from "./AccessList";
import { ApiLink } from "./ApiLink";

/**
 * Representation of an access list connected to a record.
 */
export interface RecordAccessList {
  /** Gets the Id of this access list. */
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
