import { AdditionalFilePreviewCollection } from "./AdditionalFilePreviewCollection";
import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { PublicLink } from "./PublicLink";

export interface CustomFile {
  crc32: number;
  extension: string;
  fileName: string;
  fileSize: number;
  height: number;
  id: string;
  isManual: boolean;
  label: string;
  metadata: { [key: string]: string };
  presetHash: string;
  presetName: string;
  purposes: string[];
  tag: string;
  type: string;
  uri: string;
  usages: string[];
  width: number;
  _links: CustomFileLinks;
  _embedded?: {
    [K in Exclude<
      keyof CustomFileLinks,
      "self"
    >]?: CustomFileLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface CustomFileLinks {
  self: ApiLink;
  publiclink: ApiLink<PublicLink>;
  mainpreview: ApiLink<Image>;
  filepreviews: ApiLink<AdditionalFilePreviewCollection>;
}
