import { ApiLink } from "./ApiLink";
import { PublicLinkCollection } from "./PublicLinkCollection";

export interface OriginalRendition {
  extension: string;
  id: string;
  name: string;
  preview: string;
  publishedUri: string;
  type: string;
  uri: string;
  _links: OriginalRenditionLinks;
  _embedded?: {
    [K in Exclude<
      keyof OriginalRenditionLinks,
      "self"
    >]?: OriginalRenditionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface OriginalRenditionLinks {
  self: ApiLink;
  publiclinks: ApiLink<PublicLinkCollection>;
}
