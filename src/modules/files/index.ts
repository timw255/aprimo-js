import { ApiResult } from "../../client";
import { HttpClient } from "../../http";

export const files = (client: HttpClient) => ({
  checkOut: async (fileId: string): Promise<ApiResult<void>> => {
    const url = `/api/core/file/${fileId}/checkouts`;

    return client.post(url, null);
  },

  checkIn: async (fileId: string): Promise<ApiResult<void>> => {
    const url = `/api/core/file/${fileId}/checkouts`;

    return client.delete(url);
  },
});
