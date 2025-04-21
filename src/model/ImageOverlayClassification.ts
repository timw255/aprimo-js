import { ApiLink } from "./ApiLink";
import { Classification } from "./Classification";

export interface ImageOverlayClassification {
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

export interface ImageOverlayClassificationLinks {
  self: ApiLink;
  target: ApiLink<Classification>;
}
