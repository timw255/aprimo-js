import { ApiLink } from "./ApiLink";
import { Image } from "./Image";

export interface FilePreview {
  createdOn: string;
  id: string;
  isManual: boolean;
  isMaster: boolean;
  name: string;
  tag: string;
  _links: FilePreviewLinks;
  _embedded?: {
    [K in Exclude<
      keyof FilePreviewLinks,
      "self"
    >]?: FilePreviewLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface FilePreviewLinks {
  self: ApiLink;
  preview: ApiLink<Image>;
  thumbnail: ApiLink<Image>;
}
