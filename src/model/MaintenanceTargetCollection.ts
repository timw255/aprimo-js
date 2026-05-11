import { ApiLink } from "./ApiLink";

/**
 * A collection of maintenance targets (polymorphic).
 */
export interface MaintenanceTargetCollection {
  /**
   * A collection of maintenance target items (OrderTarget,
   * ClassificationMaintenanceTarget, RecordMaintenanceTarget,
   * ReportingMaintenanceTarget, or RuleMaintenanceTarget).
   */
  items: object[];
  _links: MaintenanceTargetCollectionLinks;
}

export interface MaintenanceTargetCollectionLinks {
  self: ApiLink;
}
