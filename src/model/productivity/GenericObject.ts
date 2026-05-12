import { PmPagedLinks } from "./PmPagedCollection";

/**
 * Discriminator for the five tenant-configurable PM "generic object"
 * kinds. Each maps to a separate URL path (`/api/generic-object-alpha`,
 * etc.). Tenant configuration decides what each slot represents.
 */
export type GenericObjectType = "alpha" | "bravo" | "charlie" | "delta" | "echo";

/**
 * A generic-object instance — schemaless apart from the standard PM
 * envelope (name, description, audit fields, extended attributes). The
 * `relatedObjectId` ties the row back to the PM object it relates to.
 */
export interface GenericObject {
  /** Stable numeric identifier. */
  id: number;
  /** Display name. */
  name: string;
  /** Long-form description. */
  description?: string;
  /** PM user id of the creator. */
  createdBy?: number;
  /** Creation timestamp. */
  createdDate?: string;
  /** PM user id of the last modifier. */
  modifiedBy?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Id of the PM object this row relates to. */
  relatedObjectId?: number;
  /** Status. */
  status?: string;
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
