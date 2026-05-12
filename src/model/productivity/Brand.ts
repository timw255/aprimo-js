/**
 * A tenant-configured brand. The PM API only surfaces id + name on the
 * read endpoint; richer brand data lives in the admin UI.
 */
export interface Brand {
  /** Stable numeric identifier. */
  brandId?: number;
  /** Display name. */
  name?: string;
}
