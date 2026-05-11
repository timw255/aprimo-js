import { ApiLink } from "./ApiLink";

/**
 * Representation of a check category — a grouping for checks in the check framework system.
 * Each Check belongs to a single CheckCategory.
 */
export interface CheckCategory {
  id: string;
  name: string;
  _links: CheckCategoryLinks;
}

export interface CheckCategoryLinks {
  self: ApiLink;
}
