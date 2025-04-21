import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { RecordLocks } from "../../model/RecordLocks";

export const recordLocks = (client: HttpClient) => ({
  getforRecord: async (recordId: string): Promise<ApiResult<RecordLocks>> => {
    const url = `/api/core/record/${recordId}/locks`;

    return client.get(url);
  },
});
