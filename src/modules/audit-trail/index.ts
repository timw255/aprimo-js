import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { AuditEntryCollection } from "../../model/AuditEntryCollection";
import { AuditEntryId } from "../../model/AuditEntryId";

export const auditTrail = (client: HttpClient) => ({
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

  getEntryById: async (
    recordId: string,
    entryId: number,
  ): Promise<ApiResult<AuditEntryId>> => {
    const url = `/api/core/record/${recordId}/trail/entry/${entryId}`;

    return client.get(url);
  },
});
