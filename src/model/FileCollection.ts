import { ApiLink } from "./ApiLink";
import { File } from "./File";

export interface FileCollection {
  items: File[];
  _links: FileCollectionLinks;
}

export interface FileCollectionLinks {
  self: ApiLink;
}
