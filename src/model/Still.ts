import { AdditionalFilePreviewCollection } from "./AdditionalFilePreviewCollection";
import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { PublicLink } from "./PublicLink";

export interface Still {
  crc32: number;
  creationMode: string;
  extension: string;
  fileName: string;
  fileSize: number;
  id: string;
  isManual: boolean;
  label: string;
  metadata: { [key: string]: string };
  offset: number;
  purposes: string[];
  tag: string;
  timeStamp: number;
  type: string;
  uri: string;
  usages: string[];
  _links: StillLinks;
  _embedded?: {
    [K in Exclude<keyof StillLinks, "self">]?: StillLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

export interface StillLinks {
  self: ApiLink;
  publiclink: ApiLink<PublicLink>;
  mainpreview: ApiLink<Image>;
  filepreviews: ApiLink<AdditionalFilePreviewCollection>;
}
