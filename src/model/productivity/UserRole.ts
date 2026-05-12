import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A tenant user role. Distinct from per-activity role bindings
 * (see {@link ActivityRole}).
 */
export interface UserRole {
  /** Stable numeric identifier. */
  roleId: number;
  /** Display name. */
  name: string;
  /** Long-form description. */
  description?: string;
  /** Active flag. */
  activeFlag: number;
  /** Currency code id used for labor-rate fields. */
  currencyCode?: number;
  /** Labor-rate base (cost per hour, in `currencyCode`). */
  laborRateBase?: number;
  /** Whether to exclude from chatboard mentions. */
  excludeFromChatboards?: number;
  /** Whether the role is selectable in annotations. */
  usedInAnnotations?: number;
  /** Hex color used to badge the role in the UI. */
  color?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** Direct user members. */
  users?: { userId: number }[];
  /** Group members. */
  groups?: { userId: number }[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
