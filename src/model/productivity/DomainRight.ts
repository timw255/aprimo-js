import { PmPagedLinks } from "./PmPagedCollection";

/**
 * An entry in the catalog of PM function rights. Function ids surfaced
 * here are what gets attached to users (via `UserRight`) and groups (via
 * `GroupRight`) to authorize capabilities within a domain.
 */
export interface DomainRight {
  /** Human-readable function name. */
  name: string;
  /** Stable function id used in grant payloads. */
  functionID: number;
  /** Long-form description of what the function controls. */
  description: string;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
