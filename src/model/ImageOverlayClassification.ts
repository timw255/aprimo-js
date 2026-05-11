import { ApiLink } from "./ApiLink";
import { Classification } from "./Classification";

/**
 * Representation of an overlay's classification.
 */
export interface ImageOverlayClassification {
  /** The Id of this classification. */
  id: string;
  _links: ImageOverlayClassificationLinks;
  _embedded?: {
    [K in Exclude<
      keyof ImageOverlayClassificationLinks,
      "self"
    >]?: ImageOverlayClassificationLinks[K] extends ApiLink<infer R>
      ? R
      : never;
  };
}

/**
 * HAL `_links` for {@link ImageOverlayClassification}.
 */
export interface ImageOverlayClassificationLinks {
  self: ApiLink;
  target: ApiLink<Classification>;
}
