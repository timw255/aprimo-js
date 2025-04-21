import { ApiLink } from "./ApiLink";
import { ImageOverlayClassification } from "./ImageOverlayClassification";

export interface ImageOverlayClassificationCollection {
  items: ImageOverlayClassification[];
  _links: ImageOverlayClassificationCollectionLinks;
}

export interface ImageOverlayClassificationCollectionLinks {
  self: ApiLink;
}
