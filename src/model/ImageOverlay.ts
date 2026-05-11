import { ApiLink } from "./ApiLink";
import { ImageOverlayClassificationCollection } from "./ImageOverlayClassificationCollection";
import { ImageOverlayUserGroupCollection } from "./ImageOverlayUserGroupCollection";

/**
 * Representation of an ImageOverlay.
 */
export interface ImageOverlay {
  /** The date when this overlay was created. Format: date-time. */
  createdOn: string;
  /** The status of this overlay. */
  enabled: boolean;
  /** The Id of this overlay. Format: int32. */
  id: number;
  /** The date when this overlay was updated. Format: date-time. */
  modifiedOn: string;
  /** The display name (the spec describes this field as the "Comments" of this overlay). */
  name: string;
  _links: ImageOverlayLinks;
  _embedded?: {
    [K in Exclude<
      keyof ImageOverlayLinks,
      "self"
    >]?: ImageOverlayLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL `_links` for {@link ImageOverlay}.
 */
export interface ImageOverlayLinks {
  self: ApiLink;
  usergroups: ApiLink<ImageOverlayUserGroupCollection>;
  classifications: ApiLink<ImageOverlayClassificationCollection>;
}
