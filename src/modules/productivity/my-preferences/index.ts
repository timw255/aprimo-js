import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { RegionPreferences } from "../../../model/productivity/RegionPreferences";

export type UpdateRegionPreferencesRequest = Partial<RegionPreferences>;

export const myPreferences = (client: HttpClient) => ({
  getRegion: async (): Promise<ApiResult<RegionPreferences>> => {
    return client.get("/api/my-preferences/region");
  },

  updateRegion: async (
    request: UpdateRegionPreferencesRequest,
  ): Promise<ApiResult<RegionPreferences>> => {
    return client.put("/api/my-preferences/region", request);
  },
});
