import { ApiLink } from "./ApiLink";
import { ImageOverlayClassification } from "./ImageOverlayClassification";

/**
 * Representation of a non-paged collection of ImageOverlayClassification items.
 */
export interface ImageOverlayClassificationCollection {
  /** A collection of image overlay classification items. */
  items: ImageOverlayClassification[];
  _links: ImageOverlayClassificationCollectionLinks;
}

/**
 * HAL `_links` for {@link ImageOverlayClassificationCollection}.
 */
export interface ImageOverlayClassificationCollectionLinks {
  self: ApiLink;
}
