import { ApiLink } from "./ApiLink";
import { Version } from "./Version";

export interface VersionCollection {
  items: Version[];
  _links: VersionCollectionLinks;
}

export interface VersionCollectionLinks {
  self: ApiLink;
}
