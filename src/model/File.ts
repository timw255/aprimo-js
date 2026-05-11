import { ApiLink } from "./ApiLink";
import { FieldCollection } from "./FieldCollection";
import { FileVersion } from "./FileVersion";
import { FileVersionCollection } from "./FileVersionCollection";
import { Image } from "./Image";
import { User } from "./User";
import { Watermark } from "./Watermark";

/**
 * Representation of a File.
 *
 * Pass an {@link Expander} chain `for<File>("File")` to populate related
 * resources under `_embedded`. Expandable keys: `preview`, `thumbnail`,
 * `fileversions`, `latestfileversion`, `fields`, `checkedoutby`, `watermark`,
 * `createdby`.
 */
export interface File {
  /** Gets a value indicating whether the file is checked out. */
  checkedOut: boolean;
  /** Gets the checked out on date in UTC time. */
  checkedOutOn: string | null;
  /** Gets the creation datetime in UTC time. */
  createdOn: string;
  /** Gets the identifier for this file. AprimoId. */
  id: string;
  /** Gets or sets the watermark id. AprimoId. */
  watermarkId: string;
  /**
   * Gets or sets the watermark type.
   */
  watermarkType: "None" | "InheritFromFile" | "UseSetting" | "UseSpecified";
  _links: FileLinks;
  _embedded?: {
    [K in Exclude<keyof FileLinks, "self">]?: FileLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

/**
 * HAL link relations for a {@link File}.
 */
export interface FileLinks {
  /** Self link. */
  self: ApiLink;
  /** Preview image of the file. */
  preview: ApiLink<Image>;
  /** Thumbnail image of the file. */
  thumbnail: ApiLink<Image>;
  /** Collection of versions of this file. */
  fileversions: ApiLink<FileVersionCollection>;
  /** The latest version of this file. */
  latestfileversion: ApiLink<FileVersion>;
  /** Fields associated with this file. */
  fields: ApiLink<FieldCollection>;
  /** User who has the file checked out, if any. */
  checkedoutby: ApiLink<User>;
  /** Watermark configuration applied to this file. */
  watermark: ApiLink<Watermark>;
  /** User who created this file. */
  createdby: ApiLink<User>;
}
