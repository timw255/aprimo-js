import { ApiLink } from "./ApiLink";
import { PublicLinkCollection } from "./PublicLinkCollection";

export interface TrimRendition {
  duration: string;
  extension: string;
  id: string;
  name: string;
  preview: string;
  publishedUri: string;
  startTime: string;
  type: string;
  uri: string;
  _links: TrimRenditionLinks;
  _embedded?: {
    [K in Exclude<
      keyof TrimRenditionLinks,
      "self"
    >]?: TrimRenditionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface TrimRenditionLinks {
  self: ApiLink;
  publiclinks: ApiLink<PublicLinkCollection>;
}
