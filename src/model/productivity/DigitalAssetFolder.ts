import { PmPagedLinks } from "./PmPagedCollection";

/**
 * Folder membership of a {@link DigitalAsset}. Each entry pairs an asset
 * with the tenant-defined category (folder) it lives in.
 */
export interface DigitalAssetFolder {
  /** Folder display title. */
  title?: string;
  /** Folder (category) id. */
  categoryId?: number;
  /** Asset id of the membership row. */
  digitalAssetId?: number;
  /** HAL paging/self links on list responses. */
  _links?: PmPagedLinks;
}
