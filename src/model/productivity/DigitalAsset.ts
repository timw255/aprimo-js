import { PmPagedLinks } from "./PmPagedCollection";

/**
 * A PM-side digital asset. Distinct from DAM records: PM digital assets
 * live entirely within the PM API (versions, renditions, folders, and
 * annotations all hang off them).
 */
export interface DigitalAsset {
  /** Stable numeric identifier. */
  assetId: number;
  /** Display title. */
  title: string;
  /** Asset type id. */
  type?: number;
  /** Lifecycle status id. */
  assetStatus?: number;
  /** Restriction status id (controls who can download / view). */
  restrictionStatus?: number;
  /** Whether the asset carries versions. */
  hasVersions?: boolean;
  /** Whether the asset is visible in the portal. */
  visibleInPortal?: number;
  /** Creation timestamp. */
  createdDate?: string;
  /** Last modification timestamp. */
  modifiedDate?: string;
  /** PM user id of the last modifier. */
  modifiedUser?: number;
  /** Whether the asset is a reference document (read-only). */
  isReferenceDocument?: boolean;
  /** Human-readable asset type label. */
  assetType?: string;
  /** PM user id of the owner. */
  ownerId?: number;
  /** File id of a custom thumbnail. */
  customThumbnail?: number;
  /** Whether on-demand renditions are allowed. */
  allowOnDemand?: number;
  /** Whether this asset was promoted from an activity. */
  promotedFromActivity?: boolean;
  /** Activity id this asset originated from, if promoted. */
  activityId?: number;
  /** Package memberships (open-ended schema). */
  packages?: unknown[];
  /** Category assignments (open-ended schema). */
  categories?: unknown[];
  /** Single-value extended-attribute values. */
  extendedAttributes?: unknown[];
  /** Multi-value extended-attribute values. */
  multipleValueExtendedAttributes?: unknown[];
  /** Whether download is allowed. */
  canDownload?: boolean;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
