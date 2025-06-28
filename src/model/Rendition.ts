import { ApiLink } from "./ApiLink";
import { PublicLinkCollection } from "./PublicLinkCollection";

export interface Rendition {
  extension: string;
  id: string;
  name: string;
  preview: string;
  publishedUri: string;
  type: string;
  uri: string;
  width: number,
  height: number,
  resizeWidth: number,
  resizeHeight: number,
  _links: RenditionLinks;
  _embedded?: {
    [K in Exclude<
      keyof RenditionLinks,
      "self"
    >]?: RenditionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface RenditionLinks {
  self: ApiLink;
  publiclinks: ApiLink<PublicLinkCollection>;
}
