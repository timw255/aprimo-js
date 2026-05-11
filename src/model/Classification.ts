import { ApiLink } from "./ApiLink";
import { ClassificationCollection } from "./ClassificationCollection";
import { ClassificationDownloadPermissions } from "./ClassificationDownloadPermissions";
import { ClassificationPermissions } from "./ClassificationPermissions";
import { FieldCollection } from "./FieldCollection";
import { Image } from "./Image";
import { Label } from "./Label";
import { RegisteredField } from "./RegisteredField";
import { RegisteredFieldGroup } from "./RegisteredFieldGroup";
import { User } from "./User";

/**
 * Representation of a classification in the DAM taxonomy.
 *
 * Pass an {@link Expander} chain `for<Classification>("Classification")` to
 * populate related resources under `_embedded`. Expandable keys: `parent`,
 * `ancestors`, `children`, `image`, `fields`, `recordpermissions`,
 * `downloadpermissions`, `classificationtreepermissions`,
 * `slaveclassifications`, `followerclassifications`,
 * `classificationtreepermission`, `modifiedby`, `createdby`.
 */
export interface Classification {
  /** The unique identifier (GUID) of this classification. */
  id: string;
  /** A human-readable identifier; settable on creation and often used for external system integrations. */
  identifier: string;
  /** The internal name of this classification (not localized). */
  name: string;
  /** The full name path from root to this classification, using internal names separated by slashes. */
  namePath: string | null;
  /** The full localized label path from root to this classification. */
  labelPath: string | null;
  /** Collection of localized labels for this classification in different languages. */
  labels: Label[];
  /** The creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** The last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /** Indicates if this is a root classification (has no parent). */
  isRoot: boolean;
  /** The ID of the parent classification. Null for root classifications. */
  parentId: string | null;
  /** Indicates if this classification has child classifications. */
  hasChildren: boolean | null;
  /** Collection of field groups registered on this classification. */
  registeredFieldGroups: RegisteredFieldGroup[];
  /** Collection of fields registered on this classification. */
  registeredFields: RegisteredField[];
  /** The sort index of this classification among its siblings. Format: int32. */
  sortIndex: number;
  /**
   * Determines how child classifications of this classification are sorted.
   */
  sortOrder: "Label" | "Name" | "SortIndex";
  /** Indicates whether this classification is disabled in the DAM user interface. */
  disabledInDAMUI: boolean;
  /** Custom XML tag data. */
  tag: string | null;
  /** HAL-style hypermedia links for this resource. */
  _links: ClassificationLinks;
  /** Embedded related resources, keyed by link relation. */
  _embedded?: {
    [K in Exclude<
      keyof ClassificationLinks,
      "self"
    >]?: ClassificationLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

/** HAL-style link relations exposed on a Classification resource. */
export interface ClassificationLinks {
  /** Self link to this classification. */
  self: ApiLink;
  /** The parent classification. */
  parent: ApiLink<Classification>;
  /** All ancestor classifications up to the root. */
  ancestors: ApiLink;
  /** Direct child classifications. */
  children: ApiLink<ClassificationCollection>;
  /** Classification image/icon. */
  image: ApiLink<Image>;
  /** Metadata fields on this classification. */
  fields: ApiLink<FieldCollection>;
  /** Record-level permissions inherited from this classification. */
  recordpermissions: ApiLink<ClassificationPermissions>;
  /** Download permissions for this classification. */
  downloadpermissions: ApiLink<ClassificationDownloadPermissions>;
  /** Tree navigation permissions (collection variant). */
  classificationtreepermissions: ApiLink<ClassificationPermissions>;
  /** Tree navigation permission (singular variant). */
  classificationtreepermission: ApiLink<ClassificationPermissions>;
  /** Slave classifications linked to this classification. */
  slaveclassifications: ApiLink<ClassificationCollection>;
  /** Classifications that automatically follow when records are linked here. */
  followerclassifications: ApiLink<ClassificationCollection>;
  /** User who last modified this classification. */
  modifiedby: ApiLink<User>;
  /** User who created this classification. */
  createdby: ApiLink<User>;
}
