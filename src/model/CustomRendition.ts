import { ApiLink } from "./ApiLink";
import { PublicLinkCollection } from "./PublicLinkCollection";

export interface CustomRendition {
  extension: string;
  id: string;
  metadata: { [key: string]: string };
  name: string;
  preview: string;
  publishedUri: string;
  type: string;
  uri: string;
  _links: CustomRenditionLinks;
  _embedded?: {
    [K in Exclude<
      keyof CustomRenditionLinks,
      "self"
    >]?: CustomRenditionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface CustomRenditionLinks {
  self: ApiLink;
  publiclinks: ApiLink<PublicLinkCollection>;
}
