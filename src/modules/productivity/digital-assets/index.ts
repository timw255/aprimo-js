import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { DigitalAsset } from "../../../model/productivity/DigitalAsset";

/** Payload for `digitalAssets.create`. */
export interface CreateDigitalAssetRequest {
  /** Display title. */
  title: string;
  /** Asset type id. */
  type?: number;
  /** Lifecycle status id. */
  assetStatus?: number;
  /** Restriction status id (controls who can download / view). */
  restrictionStatus?: number;
  /** Whether the asset will carry versions (`true`/`false`). */
  hasVersions?: boolean;
  /** Whether the asset is visible in the portal. */
  visibleInPortal?: number;
  /** Whether the asset is a reference document (read-only). */
  isReferenceDocument?: boolean;
  /** PM user id of the owner. */
  ownerId?: number;
  /** File id (from {@link uploader}) of a custom thumbnail. */
  customThumbnail?: number;
  /** Whether on-demand renditions are allowed. */
  allowOnDemand?: number;
  /** Whether this asset was promoted from an activity (`true`/`false`). */
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
}

/** Payload for `digitalAssets.update`. */
export type UpdateDigitalAssetRequest = Partial<CreateDigitalAssetRequest>;

/**
 * PM-side digital assets. Distinct from DAM records: PM digital assets
 * live entirely within the PM API surface (versions, renditions, folders,
 * and annotations all hang off them).
 */
export const digitalAssets = (client: HttpClient) => ({
  /** Fetch a single digital asset by id. */
  getById: async (id: number | string): Promise<ApiResult<DigitalAsset>> => {
    return client.get(`/api/digital-assets/${id}`);
  },

  /**
   * Create a new digital asset record. To attach a file, upload it with
   * the PM {@link uploader} first and then create a version via
   * {@link digitalAssetVersions}.
   */
  create: async (
    request: CreateDigitalAssetRequest,
  ): Promise<ApiResult<DigitalAsset>> => {
    return client.post("/api/digital-assets/", request);
  },

  /** Update an existing digital asset. */
  update: async (
    id: number | string,
    request: UpdateDigitalAssetRequest,
  ): Promise<ApiResult<DigitalAsset>> => {
    return client.put(`/api/digital-assets/${id}`, request);
  },

  /** Permanently delete a digital asset. */
  delete: async (id: number | string): Promise<ApiResult<void>> => {
    return client.delete(`/api/digital-assets/${id}`);
  },
});
