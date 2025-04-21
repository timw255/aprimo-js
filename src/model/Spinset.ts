import { AdditionalFilePreviewCollection } from "./AdditionalFilePreviewCollection";
import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { PublicLink } from "./PublicLink";

export interface Spinset {
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
  _links: SpinsetLinks;
  _embedded?: {
    [K in Exclude<
      keyof SpinsetLinks,
      "self"
    >]?: SpinsetLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface SpinsetLinks {
  self: ApiLink;
  publiclink: ApiLink<PublicLink>;
  mainpreview: ApiLink<Image>;
  filepreviews: ApiLink<AdditionalFilePreviewCollection>;
}
