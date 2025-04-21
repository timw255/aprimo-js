import { ApiLink } from "./ApiLink";
import { PublicLinkCollection } from "./PublicLinkCollection";

export interface CropRendition {
  colorSpace: string;
  extension: string;
  height: number;
  id: string;
  isPreset: boolean;
  isSmart: boolean;
  name: string;
  presetHash: string;
  presetName: string;
  preview: string;
  publishedUri: string;
  resizeFormat: string;
  resizeHeight: number;
  resizeWidth: number;
  resolution: number;
  type: string;
  uri: string;
  width: number;
  x: number;
  y: number;
  _links: CropRenditionLinks;
  _embedded?: {
    [K in Exclude<
      keyof CropRenditionLinks,
      "self"
    >]?: CropRenditionLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface CropRenditionLinks {
  self: ApiLink;
  publiclinks: ApiLink<PublicLinkCollection>;
}
