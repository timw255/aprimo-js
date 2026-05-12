/**
 * A user's membership in a {@link Team} — pairs a user with a role and
 * carries per-team edit/financial-edit flags.
 */
export interface TeamMember {
  /** Stable numeric identifier for the membership row. */
  teamMemberId: number;
  /** Owning team id. */
  teamId: number;
  /** Role id within the team. */
  roleId: number;
  /** PM user id of the member. */
  userId: number;
  /** Whether the member can edit team content. */
  hasEditRight: number;
  /** Whether the member can edit financials. */
  hasFinancialsEditRight: number;
}
