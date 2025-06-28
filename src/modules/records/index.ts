import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { QueryParams } from "../../model/QueryParams";
import { Record } from "../../model/Record";
import { Expander } from "../../expander";
import { SetActions } from "../../model/SetActions";
import { Field } from "../../model/Field";
import { buildHeaders } from "../../utils";

export interface CreateRecordRequest {
  status?: "draft" | "released" | "archived";
  fields?: SetActions<Field>;
  classifications?: {
    addOrUpdate: { id: string }[];
  };
  files?: {
    master: string;
    addOrUpdate?: {
      versions: {
        addOrUpdate: {
          id: string;
          fileName: string;
          versionLabel?: string;
          comment?: string;
        }[];
      };
    }[];
  };
}

export interface UpdateRecordRequest {
  status?: "draft" | "released" | "archived";
  fields?: SetActions<Field>;
  classifications?: {
    addOrUpdate: { id: string }[];
    remove?: { id: string }[];
  };
  files?: {
    master?: string;
    addOrUpdate?: {
      id: string;
      versions?: {
        addOrUpdate?: {
          id: string;
          fileName?: string;
          versionLabel?: string;
          comment?: string;
          additionalFiles?: {
            addOrUpdate?: {
              id: string;
              label?: string;
              filename?: string;
              type?: string;
            }[];
            remove?: {
              id: string;
            }[];
          };
        }[];
        remove?: {
          id: string;
        }[];
      };
    }[];
    remove?: {
      id: string;
    }[];
  };
}

export interface CreateRecordResponse {
  id: string;
}

export const records = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
    expander?: Expander,
    languages?: "*" | string[],
  ): Promise<ApiResult<PagedCollection<Record>>> => {
    const headers = buildHeaders(params, expander);

    if (languages) {
      headers["languages"] = languages === "*" ? "*" : languages.join(",");
    }

    return client.get("/api/core/records", headers);
  },

  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
    languages?: "*" | string[],
  ): AsyncGenerator<ApiResult<PagedCollection<Record>>, void, unknown> {
    let currentPage = params.page ?? 1;
    const pageSize = params.pageSize ?? 100;

    while (true) {
      const result = await this.get(
        { ...params, page: currentPage, pageSize },
        expander,
        languages,
      );

      yield result;

      if (!result.ok || !result.data?._links?.next) break;

      currentPage++;
    }
  },

  getById: async (
    id: string,
    expander?: Expander,
    languages?: "*" | string[],
  ): Promise<ApiResult<Record>> => {
    const headers = buildHeaders(undefined, expander);

    if (languages) {
      headers["languages"] = languages === "*" ? "*" : languages.join(",");
    }

    return client.get(`/api/core/record/${id}`, headers);
  },

  create: async (
    request: CreateRecordRequest,
    immediateSearchIndexUpdate: boolean = false,
  ): Promise<ApiResult<CreateRecordResponse>> => {
    const headers = immediateSearchIndexUpdate
      ? { "set-immediateSearchIndexUpdate": "true" }
      : undefined;

    return client.post("/api/core/records", request, headers);
  },

  update: async (
    id: string,
    request: UpdateRecordRequest,
    immediateSearchIndexUpdate: boolean = false,
  ): Promise<ApiResult<void>> => {
    const headers = immediateSearchIndexUpdate
      ? { "set-immediateSearchIndexUpdate": "true" }
      : undefined;

    return client.put(`/api/core/record/${id}`, request, headers);
  },

  delete: async (
    id: string,
    immediateSearchIndexUpdate: boolean = false,
  ): Promise<ApiResult<void>> => {
    const headers = immediateSearchIndexUpdate
      ? { "set-immediateSearchIndexUpdate": "true" }
      : undefined;

    return client.delete(`/api/core/record/${id}`, headers);
  },
});
