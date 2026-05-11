import { ApiLink } from "./ApiLink";
import { UserGroup } from "./UserGroup";

/**
 * Representation of an overlay/EULA user group.
 */
export interface ImageOverlayUserGroup {
  /** The Id of this user group. */
  id: string;
  _links: ImageOverlayUserGroupLinks;
  _embedded?: {
    [K in Exclude<
      keyof ImageOverlayUserGroupLinks,
      "self"
    >]?: ImageOverlayUserGroupLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/**
 * HAL `_links` for {@link ImageOverlayUserGroup}.
 */
export interface ImageOverlayUserGroupLinks {
  self: ApiLink;
  target: ApiLink<UserGroup>;
}
