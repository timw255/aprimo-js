import { ApiLink } from "./ApiLink";
import { ImageOverlayClassificationCollection } from "./ImageOverlayClassificationCollection";
import { ImageOverlayUserGroupCollection } from "./ImageOverlayUserGroupCollection";

export interface ImageOverlay {
  createdOn: string;
  enabled: boolean;
  id: number;
  modifiedOn: string;
  name: string;
  _links: ImageOverlayLinks;
  _embedded?: {
    [K in Exclude<
      keyof ImageOverlayLinks,
      "self"
    >]?: ImageOverlayLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface ImageOverlayLinks {
  self: ApiLink;
  usergroups: ApiLink<ImageOverlayUserGroupCollection>;
  classifications: ApiLink<ImageOverlayClassificationCollection>;
}
