import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { RecordLocks } from "../../model/RecordLocks";

export const recordLocks = (client: HttpClient) => ({
  /**
   * List the active locks on a record.
   *
   * Record locks are separate from file check-out (`aprimo.files.checkOut` /
   * `aprimo.files.checkIn`) — they apply to the record itself rather than to
   * its master file.
   *
   * @example
   * ```ts
   * const res = await aprimo.recordLocks.getforRecord(recordId);
   * ```
   */
  getforRecord: async (recordId: string): Promise<ApiResult<RecordLocks>> => {
    const url = `/api/core/record/${recordId}/locks`;

    return client.get(url);
  },
});
