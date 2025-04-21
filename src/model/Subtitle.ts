import { AdditionalFilePreviewCollection } from "./AdditionalFilePreviewCollection";
import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { PublicLink } from "./PublicLink";

export interface Subtitle {
  crc32: number;
  extension: string;
  fileName: string;
  fileSize: number;
  id: string;
  isManual: boolean;
  label: string;
  metadata: { [key: string]: string };
  purposes: string[];
  tag: string;
  type: string;
  uri: string;
  usages: string[];
  _links: SubtitleLinks;
  _embedded?: {
    [K in Exclude<
      keyof SubtitleLinks,
      "self"
    >]?: SubtitleLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface SubtitleLinks {
  self: ApiLink;
  publiclink: ApiLink<PublicLink>;
  mainpreview: ApiLink<Image>;
  filepreviews: ApiLink<AdditionalFilePreviewCollection>;
}
