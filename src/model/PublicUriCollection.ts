import { ApiLink } from "./ApiLink";
import { PublicUri } from "./PublicUri";

export interface PublicUriCollection {
  items: PublicUri[];
  _links: PublicUriCollectionLinks;
}

export interface PublicUriCollectionLinks {
  self: ApiLink;
}
