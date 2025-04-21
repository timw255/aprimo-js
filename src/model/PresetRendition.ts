import { ApiLink } from "./ApiLink";
import { PublicLinkCollection } from "./PublicLinkCollection";

export interface PresetRendition {
  crc32: number;
  extension: string;
  height: number;
  id: string;
  name: string;
  presetHash: string;
  preview: string;
  publishedUri: string;
  type: string;
  uri: string;
  width: number;
  _links: PresetRenditionLinks;
  _embedded?: {
    [K in Exclude<
      keyof PresetRenditionLinks,
      "self"
    >]?: PresetRenditionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface PresetRenditionLinks {
  self: ApiLink;
  publiclinks: ApiLink<PublicLinkCollection>;
}
