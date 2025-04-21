import { AdditionalFilePreviewCollection } from "./AdditionalFilePreviewCollection";
import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { PublicLink } from "./PublicLink";

export interface Crop {
  colorSpace: string;
  crc32: number;
  extension: string;
  fileName: string;
  fileSize: number;
  height: number;
  id: string;
  isManual: boolean;
  isPreset: boolean;
  isSmart: boolean;
  label: string;
  metadata: { [key: string]: string };
  presetHash: string;
  presetName: string;
  preview: string;
  purposes: string[];
  resizeFormat: string;
  resizeHeight: number;
  resizeWidth: number;
  resolution: number;
  tag: string;
  type: string;
  uri: string;
  usages: string[];
  x: number;
  y: number;
  width: number;
  _links: CropLinks;
  _embedded?: {
    [K in Exclude<keyof CropLinks, "self">]?: CropLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

export interface CropLinks {
  self: ApiLink;
  publiclink: ApiLink<PublicLink>;
  mainpreview: ApiLink<Image>;
  filepreviews: ApiLink<AdditionalFilePreviewCollection>;
}
