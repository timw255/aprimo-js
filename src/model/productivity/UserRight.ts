/**
 * A (function, domain) right grant — pairs a PM function id with the
 * security domain it applies to. Used both for directly-granted user
 * rights and rights inherited via group membership.
 */
export interface UserRight {
  /** PM function id (which capability is being granted). */
  functionID: number;
  /** Security-domain id the right scopes to. */
  domainID: number;
}
