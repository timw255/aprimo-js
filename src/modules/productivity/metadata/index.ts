import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import { Metadata } from "../../../model/productivity/Metadata";

export const metadata = (client: HttpClient) => ({
  getByName: async (objectName: string): Promise<ApiResult<Metadata>> => {
    return client.get(`/api/metadata/${objectName}`);
  },
});
