import { PmPagedLinks } from "./PmPagedCollection";

/** A single capability grant within a domain — used inside {@link GroupDomainRights}. */
export interface GroupRight {
  /** PM function id (which capability). */
  functionID: number;
  /** Human-readable function name. */
  functionName?: string;
  /** Domain id this right is scoped to. */
  domainID?: number;
}

/**
 * Domain-scoped rights bundle on a group — a (domain, [rights]) pair.
 */
export interface GroupDomainRights {
  /** Security-domain id this bundle applies to. */
  domainId: number;
  /** Function-level rights granted within the domain. */
  rights: GroupRight[];
}

/**
 * A PM user group. Membership is enumerated via {@link GroupMembership}.
 */
export interface Group {
  /** Stable numeric identifier. */
  groupId: number;
  /** Display name. */
  name: string;
  /** Status id (typically active/inactive). */
  status?: number;
  /** Whether the group is treated as a finance group. */
  financeGroup?: number;
  /** Long-form description. */
  description?: string;
  /** ADAM (legacy DAM) user id for cross-system mapping. */
  adamUserId?: string;
  /** PM user id of the last modifier. */
  modifiedBy?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** PM user id of the creator. */
  createdBy?: number;
  /** Creation timestamp. */
  createdDate?: string;
  /** User members. */
  users?: { userId: number }[];
  /** Role assignments. */
  roles?: { roleId: number }[];
  /** Domain-rights grants. */
  domainRights?: GroupDomainRights[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
