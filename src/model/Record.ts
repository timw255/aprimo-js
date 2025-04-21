import { ApiLink } from "./ApiLink";
import { FieldCollection } from "./FieldCollection";
import { File } from "./File";
import { FileCollection } from "./FileCollection";
import { FileVersion } from "./FileVersion";
import { Image } from "./Image";
import { RecordAccessListCollection } from "./RecordAccessListCollection";
import { RecordAnalytics } from "./RecordAnalytics";
import { RecordClassificationCollection } from "./RecordClassificationCollection";
import { RecordLock } from "./RecordLock";
import { RecordPermissions } from "./RecordPermissions";
import { User } from "./User";

export interface Record {
  aiInfluenced: string;
  contentType: string;
  createdOn: string;
  hasImageOverlay: boolean;
  id: string;
  modifiedOn: string;
  status: string;
  tag: string;
  textContent: string;
  title: string;
  _links: RecordLinks;
  _embedded?: {
    [K in Exclude<keyof RecordLinks, "self">]?: RecordLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

export interface RecordLinks {
  self: ApiLink;
  fields: ApiLink<FieldCollection>;
  files: ApiLink<FileCollection>;
  preview: ApiLink<Image>;
  thumbnail: ApiLink<Image>;
  masterfile: ApiLink<File>;
  masterfilelatestversion: ApiLink<FileVersion>;
  classifications: ApiLink<RecordClassificationCollection>;
  accesslists: ApiLink<RecordAccessListCollection>;
  permissions: ApiLink<RecordPermissions>;
  locks: ApiLink<RecordLock>;
  analyticsdata: ApiLink<RecordAnalytics>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
