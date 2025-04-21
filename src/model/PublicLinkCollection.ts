import { ApiLink } from "./ApiLink";
import { PublicLink } from "./PublicLink";

export interface PublicLinkCollection {
  items: PublicLink[];
  _links: PublicLinkCollectionLinks;
}

export interface PublicLinkCollectionLinks {
  self: ApiLink;
}
