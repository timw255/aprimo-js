import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { AuditEntryCollection } from "../../model/AuditEntryCollection";
import { AuditEntryId } from "../../model/AuditEntryId";

export const auditTrail = (client: HttpClient) => ({
  /**
   * Fetch the audit trail for a record.
   *
   * @param recordId - Record id.
   * @param filter - Limit to `"change"` events or `"download"` events.
   *   Omit to include both.
   *
   * @example
   * ```ts
   * const res = await aprimo.auditTrail.getforRecord(recordId, "download");
   * ```
   */
  getforRecord: async (
    recordId: string,
    filter?: "change" | "download",
  ): Promise<ApiResult<AuditEntryCollection>> => {
    const params = new URLSearchParams();
    if (filter) params.set("filter", filter);

    const basePath = `/api/core/record/${recordId}/trail`;
    const queryString = params.toString();
    const url = queryString ? `${basePath}?${queryString}` : basePath;

    return client.get(url);
  },

  /**
   * Fetch a single audit-trail entry on a record by its numeric entry id.
   *
   * @example
   * ```ts
   * const res = await aprimo.auditTrail.getEntryById(recordId, 12345);
   * ```
   */
  getEntryById: async (
    recordId: string,
    entryId: number,
  ): Promise<ApiResult<AuditEntryId>> => {
    const url = `/api/core/record/${recordId}/trail/entry/${entryId}`;

    return client.get(url);
  },
});
