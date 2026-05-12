import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { RegionPreferences } from "../../../model/productivity/RegionPreferences";

/** Payload for `myPreferences.updateRegion`. */
export type UpdateRegionPreferencesRequest = Partial<RegionPreferences>;

/**
 * Per-user region/locale preferences for the calling token (locale,
 * timezone, date/time format, etc.). All operations are scoped to the
 * authenticated user — there is no "by id" form.
 */
export const myPreferences = (client: HttpClient) => ({
  /**
   * Fetch the calling user's region preferences.
   *
   * @example
   * ```ts
   * const res = await aprimo.productivity.myPreferences.getRegion();
   * ```
   */
  getRegion: async (): Promise<ApiResult<RegionPreferences>> => {
    return client.get("/api/my-preferences/region");
  },

  /**
   * Update the calling user's region preferences. Send only the fields
   * you want to change.
   */
  updateRegion: async (
    request: UpdateRegionPreferencesRequest,
  ): Promise<ApiResult<RegionPreferences>> => {
    return client.put("/api/my-preferences/region", request);
  },
});
