import { AdditionalFilePreviewCollection } from "./AdditionalFilePreviewCollection";
import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { PublicLink } from "./PublicLink";

export interface Trim {
  crc32: number;
  duration: string;
  extension: string;
  fileName: string;
  fileSize: number;
  id: string;
  isManual: boolean;
  label: string;
  metadata: { [key: string]: string };
  preview: string;
  purposes: string[];
  startTime: string;
  tag: string;
  type: string;
  uri: string;
  usages: string[];
  _links: TrimLinks;
  _embedded?: {
    [K in Exclude<keyof TrimLinks, "self">]?: TrimLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

export interface TrimLinks {
  self: ApiLink;
  publiclink: ApiLink<PublicLink>;
  mainpreview: ApiLink<Image>;
  filepreviews: ApiLink<AdditionalFilePreviewCollection>;
}
