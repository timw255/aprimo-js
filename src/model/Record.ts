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

/**
 * Representation of a digital asset record in the DAM.
 *
 * Pass an {@link Expander} chain `for<Record>("Record")` to populate related
 * resources under `_embedded`. Expandable keys (rel → select-key, where they
 * differ):
 * - `fields`, `files`, `preview`, `thumbnail`
 * - `masterfile`, `masterfilelatestversion`, `masterfilelatestpublishedversion`
 * - `classifications`, `accesslists`, `permissions`, `locks`
 * - `analytics` (select-key `analyticsdata`)
 * - `managedcontent`, `modifiedby`, `createdby`
 */
export interface Record {
  /**
   * Indicates if this record has contents that was influenced by AI.
   */
  aiInfluenced: "Unknown" | "No" | "Yes";
  /** The content type of this record. */
  contentType: string;
  /** The creation datetime in UTC time. */
  createdOn: string;
  /** Indicates whether an image overlay should be shown in the UI. */
  hasImageOverlay: boolean;
  /** The unique identifier (GUID) of this record. */
  id: string;
  /** The last modification datetime in UTC time. */
  modifiedOn: string;
  /**
   * The workflow status of this record.
   */
  status: "Draft" | "Released" | "Archived";
  /** Custom XML tag data for this record. */
  tag: string | null;
  /** Extracted text content from the record's files. */
  textContent: string | null;
  /** The display title of the record. */
  title: string | null;
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
  masterfilelatestpublishedversion: ApiLink<FileVersion>;
  classifications: ApiLink<RecordClassificationCollection>;
  accesslists: ApiLink<RecordAccessListCollection>;
  permissions: ApiLink<RecordPermissions>;
  locks: ApiLink<RecordLock>;
  /** `select-key` on this link is `"analyticsdata"`. */
  analytics: ApiLink<RecordAnalytics>;
  managedcontent: ApiLink<unknown>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
