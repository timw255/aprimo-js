import { AdditionalFile } from "./AdditionalFile";
import { ApiLink } from "./ApiLink";

export interface AdditionalFileCollection {
  items: AdditionalFile[];
  _links: AdditionalFileCollectionLinks;
}

export interface AdditionalFileCollectionLinks {
  self: ApiLink;
}
