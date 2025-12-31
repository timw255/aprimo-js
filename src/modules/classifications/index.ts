import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";
import { Classification } from "../../model/Classification";
import { SetActions } from "../../model/SetActions";
import { Label } from "../../model/Label";
import { ApiResult } from "../../client";
import { CreateFrom } from "../../model/CreateFrom";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { Expander } from "../../expander";

export interface ClassificationSearchRequest {
  expression: string;
  languages?: string[];
}

export type CreateClassificationRequest = Omit<
  CreateFrom<Classification>,
  | "registeredFields"
  | "registeredFieldGroups"
  | "followerclassifications"
  | "slaveclassifications"
> & {
  registeredFields?: SetActions<string>;
  registeredFieldGroups?: SetActions<string>;
  followerclassifications?: SetActions<string>;
  slaveclassifications?: SetActions<string>;
  labels?: Label[];
};

export type UpdateClassificationRequest = Partial<
  Omit<
    CreateClassificationRequest,
    "namePath" | "labelPath" | "parentId" | "isRoot"
  >
>;

export interface CreateClassificationResponse {
  id: string;
}

export const classifications = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
    expander?: Expander,
    languages?: "*" | string[],
  ): Promise<ApiResult<PagedCollection<Classification>>> => {
    const headers = buildHeaders(params, expander);

    if (languages) {
      headers["languages"] = languages === "*" ? "*" : languages.join(",");
    }

    return client.get("/api/core/classifications", headers);
  },

  getById: async (
    id: string,
    expander?: Expander,
    languages?: "*" | string[],
  ): Promise<ApiResult<Classification>> => {
    const headers = buildHeaders(undefined, expander);

    if (languages) {
      headers["languages"] = languages === "*" ? "*" : languages.join(",");
    }

    return client.get(`/api/core/classification/${id}`, headers);
  },

  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
    languages?: "*" | string[],
  ): AsyncGenerator<ApiResult<PagedCollection<Classification>>, void, unknown> {
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

  create: async (
    request: CreateClassificationRequest,
    immediateSearchIndexUpdate: boolean = false,
  ): Promise<ApiResult<CreateClassificationResponse>> => {
    const headers = immediateSearchIndexUpdate
      ? { "set-immediateSearchIndexUpdate": "true" }
      : undefined;

    return client.post("/api/core/classifications", request, headers);
  },

  update: async (
    id: string,
    request: UpdateClassificationRequest,
    immediateSearchIndexUpdate: boolean = false,
  ): Promise<ApiResult<void>> => {
    const headers = immediateSearchIndexUpdate
      ? { "set-immediateSearchIndexUpdate": "true" }
      : undefined;

    return await client.put(`/api/core/classification/${id}`, request, headers);
  },

  delete: async (
    id: string,
    immediateSearchIndexUpdate: boolean = false,
  ): Promise<ApiResult<void>> => {
    const headers = immediateSearchIndexUpdate
      ? { "set-immediateSearchIndexUpdate": "true" }
      : undefined;

    return client.delete(`/api/core/classification/${id}`, headers);
  },
});
