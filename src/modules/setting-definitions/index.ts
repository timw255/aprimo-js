import { Expander } from "../../expander";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { QueryParams } from "../../model/QueryParams";
import { SettingDefinition } from "../../model/SettingDefinition";
import { buildHeaders } from "../../utils";

interface BaseSettingDefinitionRequest {
  name: string;
  categoryId: string;
  allowSystemSetting: boolean;
  dataType:
    | "boolean"
    | "datetime"
    | "encryptedtext"
    | "numeric"
    | "reference"
    | "role"
    | "text"
    | "xml";
  labels?: {
    languageId: string;
    value: string;
  }[];
  allowAnonymousAccess?: boolean;
  allowSiteSetting?: boolean;
  allowUserSetting?: boolean;
  roleRequiredForChange?: string;
  tag?: string | null;
  webEditor?: string | null;
  helpUrl?: string | null;
  userGroupSettingMode?: "None" | "Append" | "Overwrite";
}

export interface CreateBooleanSettingDefinitionRequest
  extends BaseSettingDefinitionRequest {
  dataType: "boolean";
  defaultValue?: boolean;
}

export interface CreateTextSettingDefinitionRequest
  extends BaseSettingDefinitionRequest {
  dataType: "text";
  defaultValue?: string;
  regularExpression?: string;
}

export interface CreateNumericSettingDefinitionRequest
  extends BaseSettingDefinitionRequest {
  dataType: "numeric";
  defaultValue?: number;
  range?: string;
}

export interface CreateDateTimeSettingDefinitionRequest
  extends BaseSettingDefinitionRequest {
  dataType: "datetime";
  defaultValue?: string;
}

export interface CreateEncryptedTextSettingDefinitionRequest
  extends BaseSettingDefinitionRequest {
  dataType: "encryptedtext";
  defaultValue?: string;
  regularExpression?: string;
}

export interface CreateXmlSettingDefinitionRequest
  extends BaseSettingDefinitionRequest {
  dataType: "xml";
  defaultValue?: string;
  schema?: string | null;
}

export interface CreateReferenceSettingDefinitionRequest
  extends BaseSettingDefinitionRequest {
  dataType: "reference";
  defaultValue?: string;
}

export interface CreateRoleSettingDefinitionRequest
  extends BaseSettingDefinitionRequest {
  dataType: "role";
}

export type CreateSettingDefinitionRequest =
  | CreateBooleanSettingDefinitionRequest
  | CreateTextSettingDefinitionRequest
  | CreateNumericSettingDefinitionRequest
  | CreateDateTimeSettingDefinitionRequest
  | CreateEncryptedTextSettingDefinitionRequest
  | CreateXmlSettingDefinitionRequest
  | CreateReferenceSettingDefinitionRequest
  | CreateRoleSettingDefinitionRequest;

export const settingDefinitions = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<SettingDefinition>>> => {
    const headers = buildHeaders(params, expander);

    return client.get("/api/core/settingdefinitions", headers);
  },

  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
  ): AsyncGenerator<
    ApiResult<PagedCollection<SettingDefinition>>,
    void,
    unknown
  > {
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
  ): Promise<ApiResult<SettingDefinition>> => {
    const headers = buildHeaders(undefined, expander);

    return client.get(`/api/core/settingdefinition/${id}`, headers);
  },

  create: async (
    request: CreateSettingDefinitionRequest,
  ): Promise<ApiResult<SettingDefinition>> => {
    return client.post("/api/core/settingdefinitions", request);
  },

  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/settingdefinition/${id}`);
  },
});
