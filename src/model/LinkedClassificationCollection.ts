import { ApiLink } from "./ApiLink";
import { LinkedClassification } from "./LinkedClassification";

export interface LinkedClassificationCollection {
  items: LinkedClassification[];
  _links: LinkedClassificationCollectionLinks;
}

export interface LinkedClassificationCollectionLinks {
  self: ApiLink;
}
