import { ApiResult } from "../../client";
import { HttpClient } from "../../http";

export const files = (client: HttpClient) => ({
  /**
   * Check out a file, locking it so the current user is the only one who can
   * upload a new version. Pair with `checkIn` to release the lock.
   *
   * For record-level (not file-level) locks, see `aprimo.recordLocks.getforRecord`.
   *
   * @param fileId - Id of the file to check out.
   *
   * @example
   * ```ts
   * await aprimo.files.checkOut(fileId);
   * // ...upload a new version...
   * await aprimo.files.checkIn(fileId);
   * ```
   */
  checkOut: async (fileId: string): Promise<ApiResult<void>> => {
    const url = `/api/core/file/${fileId}/checkouts`;

    return client.post(url, null);
  },

  /**
   * Check a file back in, releasing a prior `checkOut` lock.
   *
   * @param fileId - Id of the file to check in.
   *
   * @example
   * ```ts
   * await aprimo.files.checkIn(fileId);
   * ```
   */
  checkIn: async (fileId: string): Promise<ApiResult<void>> => {
    const url = `/api/core/file/${fileId}/checkouts`;

    return client.delete(url);
  },
});
