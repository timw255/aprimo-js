import { ApiLink } from "./ApiLink";

export interface MaintenanceTargetCollection {
  items: object[];
  _links: MaintenanceTargetCollectionLinks;
}

export interface MaintenanceTargetCollectionLinks {
  self: ApiLink;
}
