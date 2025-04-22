import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";
import { Rule } from "../../model/Rule";
import { SetActions } from "../../model/SetActions";
import { RuleCondition } from "../../model/RuleConditionCollection";
import { RuleAction } from "../../model/RuleActionCollection";
import { ApiResult } from "../../client";
import { CreateFrom } from "../../model/CreateFrom";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { Expander } from "../../expander";

export type CreateRuleRequest = Omit<CreateFrom<Rule>, "version"> & {
  conditions?: SetActions<RuleCondition>;
  actions?: SetActions<RuleAction>;
};

export type UpdateRuleRequest = Partial<CreateRuleRequest>;

export interface CreateRuleResponse {
  id: string;
}

export const rules = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<Rule>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/rules", headers);
  },

  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<ApiResult<PagedCollection<Rule>>, void, unknown> {
    let currentPage = params.page ?? 1;
    const pageSize = params.pageSize ?? 100;

    while (true) {
      const result = await this.get(
        { ...params, page: currentPage, pageSize },
        expander,
      );

      yield result;

      if (!result.ok || !result.data?._links?.next) break;

      currentPage++;
    }
  },

  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<Rule>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/rule/${id}`, headers);
  },

  create: async (request: CreateRuleRequest): Promise<ApiResult<Rule>> => {
    return client.post("/api/core/rules", request);
  },

  update: async (
    id: string,
    request: Partial<CreateRuleRequest>,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/rule/${id}`, request);
  },

  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/rule/${id}`);
  },
});
