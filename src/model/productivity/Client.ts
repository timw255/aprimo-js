/**
 * A tenant-configured client (typical for agency tenants modeling their
 * customer brands). The PM API only surfaces id + name on the read
 * endpoint; richer client data lives in the admin UI.
 */
export interface Client {
  /** Stable numeric identifier. */
  clientId?: number;
  /** Display name. */
  name?: string;
}
