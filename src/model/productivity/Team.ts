import { PmPagedLinks } from "./PmPagedCollection";
import { TeamMember } from "./TeamMember";

/**
 * A PM team — a named user grouping used to staff activities/projects.
 * Composition is enumerated under `teamMembers`.
 */
export interface Team {
  /** Stable numeric identifier. */
  teamId: number;
  /** Display name. */
  name: string;
  /** Long-form description. */
  description?: string;
  /** Member rows in the team (user + role + edit/financial rights). */
  teamMembers?: TeamMember[];
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
