import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { User } from "./User";

/**
 * Representation of a watermark (a transparent image that will be applied to another image).
 */
export interface Watermark {
  /** The creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** The Id of this watermark. */
  id: string;
  /** The last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /** The name of this watermark. */
  name: string;
  /**
   * The watermark position.
   */
  position:
    | "topleft"
    | "topcenter"
    | "topright"
    | "middleleft"
    | "middlecenter"
    | "middleright"
    | "bottomleft"
    | "bottomcenter"
    | "bottomright";
  /**
   * Custom XML Tag data for this object. Not returned by default —
   * request with header `select-watermark: Tag`.
   */
  tag: string;
  _links: WatermarkLinks;
  _embedded?: {
    [K in Exclude<
      keyof WatermarkLinks,
      "self"
    >]?: WatermarkLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL `_links` for {@link Watermark}.
 */
export interface WatermarkLinks {
  self: ApiLink;
  image: ApiLink<Image>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
