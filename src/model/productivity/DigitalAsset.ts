import { PmPagedLinks } from "./PmPagedCollection";

export interface DigitalAsset {
  assetId: number;
  title: string;
  type?: number;
  assetStatus?: number;
  restrictionStatus?: number;
  hasVersions?: boolean;
  visibleInPortal?: number;
  createdDate?: string;
  modifiedDate?: string;
  modifiedUser?: number;
  isReferenceDocument?: boolean;
  assetType?: string;
  ownerId?: number;
  customThumbnail?: number;
  allowOnDemand?: number;
  promotedFromActivity?: boolean;
  activityId?: number;
  packages?: unknown[];
  categories?: unknown[];
  extendedAttributes?: unknown[];
  multipleValueExtendedAttributes?: unknown[];
  canDownload?: boolean;
  _links?: PmPagedLinks;
}
