import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Metadata } from "../../../model/productivity/Metadata";

/**
 * Object metadata — schema-shaped description of a PM object kind
 * (`activity`, `project`, `task`, etc.). Useful for building dynamic UIs
 * that mirror tenant extended-attribute configuration.
 */
export const metadata = (client: HttpClient) => ({
  /**
   * Fetch metadata for an object by its kind name.
   *
   * @param objectName - Object kind (e.g., `"activity"`, `"project"`).
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.metadata.getByName("activity");
   * ```
   */
  getByName: async (objectName: string): Promise<ApiResult<Metadata>> => {
    return client.get(`/api/metadata/${objectName}`);
  },
});
