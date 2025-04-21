import { ApiLink } from "./ApiLink";
import { UserGroup } from "./UserGroup";

export interface ImageOverlayUserGroup {
  id: string;
  _links: ImageOverlayUserGroupLinks;
  _embedded?: {
    [K in Exclude<
      keyof ImageOverlayUserGroupLinks,
      "self"
    >]?: ImageOverlayUserGroupLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface ImageOverlayUserGroupLinks {
  self: ApiLink;
  target: ApiLink<UserGroup>;
}
