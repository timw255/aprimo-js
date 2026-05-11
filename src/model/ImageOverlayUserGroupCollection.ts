import { ApiLink } from "./ApiLink";
import { ImageOverlayUserGroup } from "./ImageOverlayUserGroup";

/**
 * Representation of a non-paged collection of ImageOverlayUserGroup items.
 */
export interface ImageOverlayUserGroupCollection {
  /** A collection of image overlay user group items. */
  items: ImageOverlayUserGroup[];
  _links: ImageOverlayUserGroupCollectionLinks;
}

/**
 * HAL `_links` for {@link ImageOverlayUserGroupCollection}.
 */
export interface ImageOverlayUserGroupCollectionLinks {
  self: ApiLink;
}
