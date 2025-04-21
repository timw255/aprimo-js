import { ApiLink } from "./ApiLink";
import { FieldCollection } from "./FieldCollection";
import { FileVersion } from "./FileVersion";
import { FileVersionCollection } from "./FileVersionCollection";
import { Image } from "./Image";
import { User } from "./User";
import { Watermark } from "./Watermark";

export interface File {
  checkedOut: boolean;
  createdOn: string;
  id: string;
  watermarkType: string;
  _links: FileLinks;
  _embedded?: {
    [K in Exclude<keyof FileLinks, "self">]?: FileLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

export interface FileLinks {
  self: ApiLink;
  preview: ApiLink<Image>;
  thumbnail: ApiLink<Image>;
  fileversions: ApiLink<FileVersionCollection>;
  latestversion: ApiLink<FileVersion>;
  fields: ApiLink<FieldCollection>;
  checkedoutby: ApiLink<User>;
  watermark: ApiLink<Watermark>;
  createdby: ApiLink<User>;
}
