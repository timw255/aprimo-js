import { ApiLink } from "./ApiLink";
import { FileVersion } from "./FileVersion";

export interface FileVersionCollection {
  items: FileVersion[];
  _links: FileVersionCollectionLinks;
}

export interface FileVersionCollectionLinks {
  self: ApiLink;
}
