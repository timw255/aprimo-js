import { ApiResult } from "../../client";
import { HeaderSource } from "../../select";
import { FileVersion } from "../../model/FileVersion";
import { FileVersionCollection } from "../../model/FileVersionCollection";
import { HttpClient } from "../../http";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";

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

  /**
   * List all versions of a file, newest first.
   *
   * @param fileId - Id of the file.
   * @param params - Pagination/sort options.
   * @param expander - Optional `Expander` chain applied to each version.
   *
   * @example
   * ```ts
   * const res = await aprimo.files.getVersions(fileId);
   * console.log(res.data?.items?.length);
   * ```
   */
  getVersions: async (
    fileId: string,
    params?: QueryParams,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<FileVersionCollection>> => {
    const headers = buildHeaders(params, expander);

    return client.get(`/api/core/file/${fileId}/fileversions`, headers);
  },

  /**
   * Fetch the latest version of a file directly, without paging through
   * `getVersions`.
   *
   * @example
   * ```ts
   * const res = await aprimo.files.getLatestVersion(fileId);
   * console.log(res.data?.fileName, res.data?.versionNumber);
   * ```
   */
  getLatestVersion: async (
    fileId: string,
    expander?: HeaderSource | HeaderSource[],
  ): Promise<ApiResult<FileVersion>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/file/${fileId}/latestversion`, headers);
  },
});
