import { QueryParams } from "../../model/QueryParams";
import { SetActions } from "../../model/SetActions";
import { UserGroupListFieldDefinition } from "../../model/UserGroupListFieldDefinition";
import { UserListFieldDefinition } from "../../model/UserListFieldDefinition";
import { RecordListFieldDefinition } from "../../model/RecordListFieldDefinition";
import { RecordLinkFieldDefinition } from "../../model/RecordLinkFieldDefinition";
import { OptionListFieldDefinition } from "../../model/OptionListFieldDefinition";
import { ClassificationListFieldDefinition } from "../../model/ClassificationListFieldDefinition";
import { TimeFieldDefinition } from "../../model/TimeFieldDefinition";
import { DateTimeFieldDefinition } from "../../model/DateTimeFieldDefinition";
import { NumericFieldDefinition } from "../../model/NumericFieldDefinition";
import { HtmlFieldDefinition } from "../../model/HtmlFieldDefinition";
import { DateFieldDefinition } from "../../model/DateFieldDefinition";
import { SingleLineTextFieldDefinition } from "../../model/SingleLineTextFieldDefinition";
import { MultiLineTextFieldDefinition } from "../../model/MultiLineTextFieldDefinition";
import { FieldDefinition } from "../../model/FieldDefinition";
import { DurationFieldDefinition } from "../../model/DurationFieldDefinition";
import { HyperlinkListFieldDefinition } from "../../model/HyperlinkListFieldDefinition";
import { JsonFieldDefinition } from "../../model/JsonFieldDefinition";
import { LanguageListFieldDefinition } from "../../model/LanguageListFieldDefinition";
import { RichContentFieldDefinition } from "../../model/RichContentFieldDefinition";
import { TextListFieldDefinition } from "../../model/TextListFieldDefinition";
import { OptionListItemDefinition } from "../../model/OptionListItemDefinition";
import { ApiResult } from "../../client";
import { CreateFrom } from "../../model/CreateFrom";
import { HttpClient } from "../../http";
import { PagedCollection } from "../../model/PagedCollection";
import { Expander } from "../../expander";
import { buildHeaders } from "../../utils";

export type CreateSingleLineTextFieldDefinitionRequest = Omit<
  CreateFrom<SingleLineTextFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateMultiLineTextFieldDefinitionRequest = Omit<
  CreateFrom<MultiLineTextFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateHtmlFieldDefinitionRequest = Omit<
  CreateFrom<HtmlFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateNumericFieldDefinitionRequest = Omit<
  CreateFrom<NumericFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateDateFieldDefinitionRequest = Omit<
  CreateFrom<DateFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateDateTimeFieldDefinitionRequest = Omit<
  CreateFrom<DateTimeFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateTimeFieldDefinitionRequest = Omit<
  CreateFrom<TimeFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateClassificationListFieldDefinitionRequest = Omit<
  CreateFrom<ClassificationListFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateOptionListFieldDefinitionRequest = Omit<
  CreateFrom<OptionListFieldDefinition>,
  "items" | "enabledLanguages" | "memberships"
> & {
  items?: SetActions<OptionListItemDefinition>;
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateRecordLinkFieldDefinitionRequest = Omit<
  CreateFrom<RecordLinkFieldDefinition>,
  | "parentContentTypes"
  | "childContentTypes"
  | "linkContentTypes"
  | "parentClassifications"
  | "childClassifications"
  | "linkClassifications"
  | "enabledLanguages"
  | "memberships"
> & {
  parentContentTypes?: SetActions<string>;
  childContentTypes?: SetActions<string>;
  linkContentTypes?: SetActions<string>;
  parentClassifications?: SetActions<string>;
  childClassifications?: SetActions<string>;
  linkClassifications?: SetActions<string>;
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateRecordListFieldDefinitionRequest = Omit<
  CreateFrom<RecordListFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateUserListFieldDefinitionRequest = Omit<
  CreateFrom<UserListFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateUserGroupListFieldDefinitionRequest = Omit<
  CreateFrom<UserGroupListFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateDurationFieldDefinitionRequest = Omit<
  CreateFrom<DurationFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateJsonFieldDefinitionRequest = Omit<
  CreateFrom<JsonFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateLanguageListFieldDefinitionRequest = Omit<
  CreateFrom<LanguageListFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateRichContentFieldDefinitionRequest = Omit<
  CreateFrom<RichContentFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateTextListFieldDefinitionRequest = Omit<
  CreateFrom<TextListFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateHyperlinkListFieldDefinitionRequest = Omit<
  CreateFrom<HyperlinkListFieldDefinition>,
  "enabledLanguages" | "memberships"
> & {
  enabledLanguages?: SetActions<string>;
  memberships?: SetActions<string>;
};

export type CreateFieldDefinitionRequest =
  | CreateSingleLineTextFieldDefinitionRequest
  | CreateMultiLineTextFieldDefinitionRequest
  | CreateHtmlFieldDefinitionRequest
  | CreateNumericFieldDefinitionRequest
  | CreateDateFieldDefinitionRequest
  | CreateDateTimeFieldDefinitionRequest
  | CreateTimeFieldDefinitionRequest
  | CreateClassificationListFieldDefinitionRequest
  | CreateOptionListFieldDefinitionRequest
  | CreateRecordLinkFieldDefinitionRequest
  | CreateRecordListFieldDefinitionRequest
  | CreateUserListFieldDefinitionRequest
  | CreateUserGroupListFieldDefinitionRequest
  | CreateDurationFieldDefinitionRequest
  | CreateJsonFieldDefinitionRequest
  | CreateLanguageListFieldDefinitionRequest
  | CreateRichContentFieldDefinitionRequest
  | CreateTextListFieldDefinitionRequest
  | CreateHyperlinkListFieldDefinitionRequest;

type DisallowedUpdateKeys = "aiEnabled" | "dataType" | "languageMode";

type UpdateField<T> = Partial<
  Omit<T, DisallowedUpdateKeys | "enabledLanguages" | "memberships"> & {
    enabledLanguages?: SetActions<string>;
    memberships?: SetActions<string>;
  }
>;

export type UpdateSingleLineTextFieldDefinitionRequest =
  UpdateField<SingleLineTextFieldDefinition>;
export type UpdateMultiLineTextFieldDefinitionRequest =
  UpdateField<MultiLineTextFieldDefinition>;
export type UpdateHtmlFieldDefinitionRequest = UpdateField<HtmlFieldDefinition>;
export type UpdateNumericFieldDefinitionRequest =
  UpdateField<NumericFieldDefinition>;
export type UpdateDateFieldDefinitionRequest = UpdateField<DateFieldDefinition>;
export type UpdateDateTimeFieldDefinitionRequest =
  UpdateField<DateTimeFieldDefinition>;
export type UpdateTimeFieldDefinitionRequest = UpdateField<TimeFieldDefinition>;
export type UpdateClassificationListFieldDefinitionRequest =
  UpdateField<ClassificationListFieldDefinition>;

export type UpdateOptionListFieldDefinitionRequest = Omit<
  UpdateField<OptionListFieldDefinition>,
  "items"
> & {
  items?: SetActions<OptionListItemDefinition>;
};

export type UpdateRecordListFieldDefinitionRequest =
  UpdateField<RecordListFieldDefinition>;

export type UpdateRecordLinkFieldDefinitionRequest = Omit<
  UpdateField<RecordLinkFieldDefinition>,
  | "parentContentTypes"
  | "childContentTypes"
  | "linkContentTypes"
  | "parentClassifications"
  | "childClassifications"
  | "linkClassifications"
> & {
  parentContentTypes?: SetActions<string>;
  childContentTypes?: SetActions<string>;
  linkContentTypes?: SetActions<string>;
  parentClassifications?: SetActions<string>;
  childClassifications?: SetActions<string>;
  linkClassifications?: SetActions<string>;
};

export type UpdateUserListFieldDefinitionRequest =
  UpdateField<UserListFieldDefinition>;
export type UpdateUserGroupListFieldDefinitionRequest =
  UpdateField<UserGroupListFieldDefinition>;
export type UpdateDurationFieldDefinitionRequest =
  UpdateField<DurationFieldDefinition>;
export type UpdateJsonFieldDefinitionRequest = UpdateField<JsonFieldDefinition>;
export type UpdateLanguageListFieldDefinitionRequest =
  UpdateField<LanguageListFieldDefinition>;
export type UpdateRichContentFieldDefinitionRequest =
  UpdateField<RichContentFieldDefinition>;
export type UpdateTextListFieldDefinitionRequest =
  UpdateField<TextListFieldDefinition>;
export type UpdateHyperlinkListFieldDefinitionRequest =
  UpdateField<HyperlinkListFieldDefinition>;

export type UpdateFieldDefinitionRequest =
  | UpdateSingleLineTextFieldDefinitionRequest
  | UpdateMultiLineTextFieldDefinitionRequest
  | UpdateHtmlFieldDefinitionRequest
  | UpdateNumericFieldDefinitionRequest
  | UpdateDateFieldDefinitionRequest
  | UpdateDateTimeFieldDefinitionRequest
  | UpdateTimeFieldDefinitionRequest
  | UpdateClassificationListFieldDefinitionRequest
  | UpdateOptionListFieldDefinitionRequest
  | UpdateRecordLinkFieldDefinitionRequest
  | UpdateRecordListFieldDefinitionRequest
  | UpdateUserListFieldDefinitionRequest
  | UpdateUserGroupListFieldDefinitionRequest
  | UpdateDurationFieldDefinitionRequest
  | UpdateJsonFieldDefinitionRequest
  | UpdateLanguageListFieldDefinitionRequest
  | UpdateRichContentFieldDefinitionRequest
  | UpdateTextListFieldDefinitionRequest
  | UpdateHyperlinkListFieldDefinitionRequest;

export const fieldDefinitions = (client: HttpClient) => ({
  /**
   * List field definitions (the metadata schema). Returns one page; use
   * `getPaged` for full traversal, or `getById` for a single item.
   *
   * @example
   * ```ts
   * const res = await aprimo.fieldDefinitions.get({ pageSize: 200 });
   * ```
   */
  get: async (
    params?: QueryParams,
    expander?: Expander,
    languages?: "*" | string[],
  ): Promise<ApiResult<PagedCollection<FieldDefinition>>> => {
    const headers = buildHeaders(params, expander);

    if (languages) {
      headers["languages"] = languages === "*" ? "*" : languages.join(",");
    }

    return client.get("/api/core/fielddefinitions", headers);
  },

  /**
   * Fetch a single field definition by id. Failure (e.g., not found) surfaces
   * as `ok: false` with the HTTP status on `ApiResult`.
   *
   * @example
   * ```ts
   * const res = await aprimo.fieldDefinitions.getById(fieldDefId);
   * ```
   */
  getById: async (
    id: string,
    expander?: Expander,
    languages?: "*" | string[],
  ): Promise<ApiResult<FieldDefinition>> => {
    const headers = buildHeaders(undefined, expander);

    if (languages) {
      headers["languages"] = languages === "*" ? "*" : languages.join(",");
    }

    return client.get(`/api/core/fielddefinition/${id}`, headers);
  },

  /**
   * Async generator yielding pages of field definitions until exhausted.
   * Wraps `get` and follows `_links.next` automatically.
   *
   * @example
   * ```ts
   * const all: FieldDefinition[] = [];
   *
   * for await (const pageResult of aprimo.fieldDefinitions.getPaged({ pageSize: 1000 })) {
   *   all.push(...(pageResult.data?.items ?? []));
   * }
   *
   * console.log("Field definition count:", all.length);
   * ```
   */
  getPaged: async function* (
    params: QueryParams = {},
    expander?: Expander,
    languages?: "*" | string[],
  ): AsyncGenerator<
    ApiResult<PagedCollection<FieldDefinition>>,
    void,
    unknown
  > {
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

  /**
   * Create a field definition. The request shape is a discriminated union
   * over field types — pass the specific request type matching the field
   * type you want (e.g. `CreateSingleLineTextFieldDefinitionRequest`).
   *
   * @example
   * ```ts
   * const res = await aprimo.fieldDefinitions.create({
   *   dataType: "SingleLineText",
   *   name: "MyField",
   *   labels: [{ languageId: "<lang-id>", value: "My field" }],
   * });
   * ```
   */
  create: async (
    request: CreateFieldDefinitionRequest,
  ): Promise<ApiResult<FieldDefinition>> => {
    return client.post("/api/core/fielddefinitions", request);
  },

  /**
   * Update a field definition. Note: `dataType`, `aiEnabled`, and `languageMode`
   * cannot be changed after creation.
   *
   * @example
   * ```ts
   * await aprimo.fieldDefinitions.update(id, { name: "RenamedField" });
   * ```
   */
  update: async (
    id: string,
    request: UpdateFieldDefinitionRequest,
  ): Promise<ApiResult<void>> => {
    return client.put(`/api/core/fielddefinition/${id}`, request);
  },

  /**
   * Permanently delete a field definition.
   *
   * @example
   * ```ts
   * await aprimo.fieldDefinitions.delete(id);
   * ```
   */
  delete: async (id: string): Promise<ApiResult<void>> => {
    return client.delete(`/api/core/fielddefinition/${id}`);
  },
});
