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
  /**
   * List configured rules. Returns one page; use `getPaged` for full
   * traversal, or `getById` for a single item.
   *
   * @example
   * ```ts
   * const res = await aprimo.rules.get();
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<Rule>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/rules", headers);
  },

  /**
   * Async generator yielding pages of rules. Wraps `get` and follows
   * `_links.next` until exhausted.
   *
   * @example
   * ```ts
   * const all: Rule[] = [];
   *
   * for await (const pageResult of aprimo.rules.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("Rule count:", all.length);
   * ```
   */
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

  /**
   * Fetch a single rule by id. Failure (e.g., not found) surfaces as
   * `ok: false` with the HTTP status on `ApiResult`.
   */
  getById: async (
    id: string,
    expander?: Expander,
  ): Promise<ApiResult<Rule>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/rule/${id}`, headers);
  },

  /**
   * Create a rule with conditions and actions.
   *
   * @example
   * ```ts
   * const res = await aprimo.rules.create({
   *   name: "Auto-classify videos",
   *   conditions: { addOrUpdate: [...] },
   *   actions: { addOrUpdate: [...] },
   * });
   * ```
   */
  create: async (request: CreateRuleRequest): Promise<ApiResult<Rule>> => {
    return client.post("/api/core/rules", request);
  },

  /**
   * Update an existing rule.
   */
  update: async (
    id: string,
    request: Partial<CreateRuleRequest>,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/rule/${id}`, request);
  },

  /**
   * Permanently delete a rule.
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/rule/${id}`);
  },
});
