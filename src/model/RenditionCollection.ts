import { ApiLink } from "./ApiLink";
import { Rendition } from "./Rendition";

export interface RenditionCollection {
  items: Rendition[];
  _links: RenditionCollectionLinks;
}

export interface RenditionCollectionLinks {
  self: ApiLink;
}
