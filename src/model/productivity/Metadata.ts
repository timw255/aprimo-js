import { PmPagedLinks } from "./PmPagedCollection";

/**
 * Schema-shaped description of a PM object kind — the fields available
 * on that object plus tenant-specific extended attributes. The shape is
 * intentionally open-ended (`[key: string]: unknown`) because per-tenant
 * configuration produces dynamic field sets.
 */
export interface Metadata {
  /** Object-kind name this metadata describes (`"activity"`, `"project"`, ...). */
  objectName?: string;
  /** Field descriptors (open-ended schema). */
  fields?: unknown[];
  /** Open-ended tenant-defined entries. */
  [key: string]: unknown;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
