import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A file attached to a PM object (activity, project, task, etc.).
 * Distinct from {@link DigitalAsset}: attachments are lighter weight —
 * no rendition/folder/annotation graphs. The `objectId`/`objectTypeId`
 * pair identifies what the attachment is hanging off of (see
 * `PmObjectTypeIds`).
 */
export interface Attachment {
  /** Stable numeric identifier. */
  attachmentId: number;
  /** Display title. */
  title: string;
  /** Id of the object the attachment is attached to. */
  objectId?: number;
  /** Type id of the object. */
  objectTypeId?: number;
  /** Attachment type id. */
  attachmentTypeId?: number;
  /** Whether the attachment is visible in projects. */
  projectVisibility?: boolean;
  /** Sub-category label for the attachment. */
  attachmentType?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** PM user id of the creator. */
  creatorId?: number;
  /** File id of a custom thumbnail. */
  customThumb?: number;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** Linked projects (open-ended schema). */
  projects?: unknown[];
  /** Activity-project list scoping flag. */
  activityProjectList?: number;
  /** Whether to send notifications on changes. */
  sendNotification?: number;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
