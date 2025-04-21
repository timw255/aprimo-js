import { ApiLink } from "./ApiLink";
import { ImageOverlayUserGroup } from "./ImageOverlayUserGroup";

export interface ImageOverlayUserGroupCollection {
  items: ImageOverlayUserGroup[];
  _links: ImageOverlayUserGroupCollectionLinks;
}

export interface ImageOverlayUserGroupCollectionLinks {
  self: ApiLink;
}
