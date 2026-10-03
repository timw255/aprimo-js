import { Aprimo } from "./client";
import {
  cacheTokenProvider,
  getClientCredentialsToken,
  getPasswordToken,
} from "./auth";
import { AprimoAuthConfigError } from "./errors";
import { HttpClientOptions } from "./http";

/**
 * Authentication strategy for `createClient`.
 *
 * - `client_credentials`: service-to-service flow (scripts, background jobs).
 *   Token is fetched and cached automatically.
 * - `password`: act on behalf of a real user without a browser login.
 *   Token is fetched and cached automatically.
 * - `custom`: bring your own token provider — useful for browser flows
 *   (PKCE + refresh) where you already manage token lifecycle.
 *
 * See the README "Authentication" section for the full setup walkthrough.
 */
export type AuthStrategy =
  | { type: "client_credentials"; clientId: string; clientSecret: string }
  | {
      type: "password";
      clientId: string;
      clientSecret: string;
      username: string;
      password: string;
    }
  | { type: "custom"; tokenProvider: () => Promise<string> };

/**
 * Options for `createClient`. `environment` is the Aprimo subdomain
 * (the `<env>` in `https://<env>.aprimo.com`).
 */
export type CreateClientOptions = {
  /** Your Aprimo subdomain — e.g., `"acme"` for `acme.aprimo.com`. */
  environment: string;
  /**
   * Whole-request timeout in milliseconds applied to every request (includes
   * upload/download time) and to token acquisition. Defaults to 30000. Pass
   * `0` to disable. Uploads opt out of this default internally so large
   * transfers are not clipped.
   */
  timeout?: number;
  /**
   * Maximum number of retries for retryable (HTTP 429) responses. Retries are
   * spaced out using the response's `Retry-After` header when present, and
   * exponential backoff otherwise.
   */
  maxRetries?: number;
  /**
   * Called before each retry with the error and 1-based attempt number.
   * Return `true` to allow the retry, `false` to stop.
   */
  retryHandler?: (error: unknown, attempt: number) => Promise<boolean>;
} & AuthStrategy;

/**
 * Construct an authenticated Aprimo SDK client.
 *
 * The returned `Aprimo` instance exposes one property per API module
 * (`records`, `files`, `search`, `uploader`, ...). For the credential and
 * password flows the SDK caches and refreshes tokens for you; with the
 * `custom` flow you own that lifecycle.
 *
 * @example
 * ```ts
 * import { createClient } from "aprimo-js";
 *
 * const aprimo = createClient({
 *   type: "client_credentials",
 *   environment: "your-subdomain",
 *   clientId: "your-client-id",
 *   clientSecret: "your-client-secret",
 * });
 *
 * const res = await aprimo.records.get({ pageSize: 50 });
 * ```
 */
export function createClient(options: CreateClientOptions): Aprimo {
  const { environment, timeout, maxRetries, retryHandler } = options;

  const httpOptions: HttpClientOptions = { timeout, maxRetries, retryHandler };

  let tokenProvider: () => Promise<string>;

  if (options.type === "client_credentials") {
    const { clientId, clientSecret } = options;
    tokenProvider = cacheTokenProvider(() =>
      getClientCredentialsToken(environment, clientId, clientSecret, timeout),
    );
  } else if (options.type === "password") {
    const { clientId, clientSecret, username, password } = options;
    tokenProvider = cacheTokenProvider(() =>
      getPasswordToken(
        environment,
        clientId,
        clientSecret,
        username,
        password,
        timeout,
      ),
    );
  } else if (options.type === "custom") {
    tokenProvider = options.tokenProvider;
  } else {
    throw new AprimoAuthConfigError(
      `Invalid authentication strategy: ${JSON.stringify((options as { type?: unknown }).type)}`,
    );
  }

  return new Aprimo(environment, tokenProvider, httpOptions);
}

export { Aprimo };
export { computeSetActions } from "./utils";
export { Expander } from "./expander";
export { Select } from "./select";
export type { HeaderSource } from "./select";

// Error classes — see `src/errors.ts` for the full hierarchy. Use `instanceof`
// to narrow `ApiResult.error` (or thrown values from `createClient`,
// `aprimo.uploader.uploadFile`, etc.).
export {
  AprimoError,
  AprimoHttpError,
  AprimoBadRequestError,
  AprimoUnauthorizedError,
  AprimoForbiddenError,
  AprimoNotFoundError,
  AprimoConflictError,
  AprimoValidationError,
  AprimoRateLimitError,
  AprimoServerError,
  AprimoNetworkError,
  AprimoTimeoutError,
  AprimoCancelledError,
  AprimoAuthError,
  AprimoAuthCredentialsError,
  AprimoAuthConfigError,
  AprimoUploadError,
  AprimoUploadSetupError,
  AprimoUploadSegmentError,
  AprimoUploadCommitError,
  AprimoConfigError,
  isAprimoError,
  isAprimoHttpError,
  isAprimoNetworkError,
  isAprimoTimeoutError,
  isAprimoCancelledError,
  isAprimoAuthError,
  isAprimoUploadError,
  isAprimoConfigError,
} from "./errors";
export type {
  AprimoErrorOptions,
  AprimoHttpErrorOptions,
  AprimoRateLimitErrorOptions,
  AprimoAuthCredentialsErrorOptions,
  AprimoUploadSegmentErrorOptions,
} from "./errors";

// ---------------------------------------------------------------------------
// Core types
//
// `ApiResult<T>` is what every SDK method resolves to; the rest are the shared
// option/parameter shapes those methods accept.
// ---------------------------------------------------------------------------
export type { ApiResult } from "./client";
export type { HttpClientOptions, RequestOptions } from "./http";
export type { QueryParams } from "./model/QueryParams";
export type { SetActions } from "./model/SetActions";

// ---------------------------------------------------------------------------
// Request and response shapes, per module
// ---------------------------------------------------------------------------
export type { CreateCheckRequest, UpdateCheckRequest, CreateCheckResultRequest, CreateCheckResultFindingData, UpdateCheckResultRequest, CreateCheckFindingRequest, UpdateCheckFindingRequest } from "./modules/checks";
export type { EditContentTypeRequest, CreateContentTypeRequest, CreateContentTypeResponse } from "./modules/content-types";
export type { CreateSingleLineTextFieldDefinitionRequest, CreateMultiLineTextFieldDefinitionRequest, CreateHtmlFieldDefinitionRequest, CreateNumericFieldDefinitionRequest, CreateDateFieldDefinitionRequest, CreateDateTimeFieldDefinitionRequest, CreateTimeFieldDefinitionRequest, CreateClassificationListFieldDefinitionRequest, CreateOptionListFieldDefinitionRequest, CreateRecordLinkFieldDefinitionRequest, CreateRecordListFieldDefinitionRequest, CreateUserListFieldDefinitionRequest, CreateUserGroupListFieldDefinitionRequest, CreateDurationFieldDefinitionRequest, CreateJsonFieldDefinitionRequest, CreateLanguageListFieldDefinitionRequest, CreateRichContentFieldDefinitionRequest, CreateTextListFieldDefinitionRequest, CreateHyperlinkListFieldDefinitionRequest, CreateFieldDefinitionRequest, UpdateSingleLineTextFieldDefinitionRequest, UpdateMultiLineTextFieldDefinitionRequest, UpdateHtmlFieldDefinitionRequest, UpdateNumericFieldDefinitionRequest, UpdateDateFieldDefinitionRequest, UpdateDateTimeFieldDefinitionRequest, UpdateTimeFieldDefinitionRequest, UpdateClassificationListFieldDefinitionRequest, UpdateOptionListFieldDefinitionRequest, UpdateRecordListFieldDefinitionRequest, UpdateRecordLinkFieldDefinitionRequest, UpdateUserListFieldDefinitionRequest, UpdateUserGroupListFieldDefinitionRequest, UpdateDurationFieldDefinitionRequest, UpdateJsonFieldDefinitionRequest, UpdateLanguageListFieldDefinitionRequest, UpdateRichContentFieldDefinitionRequest, UpdateTextListFieldDefinitionRequest, UpdateHyperlinkListFieldDefinitionRequest, UpdateFieldDefinitionRequest } from "./modules/field-definitions";
export type { CreateFieldGroupRequest, UpdateFieldGroupRequest } from "./modules/field-groups";
export type { CreateFileTypeRequest, UpdateFileTypeRequest, CreateFileTypeResponse } from "./modules/file-types";
export type { CreateLanguageRequest, UpdateLanguageRequest, CreateLanguageResponse } from "./modules/languages";
export type { MaintenanceJobTarget, MaintenanceJobAction, CreateMaintenanceJobRequest, CreateMaintenanceJobResponse } from "./modules/maintenance-jobs";
export type { CreateOrderTarget, CreateDownloadOrderRequest, CreateEmailOrderRequest, CreateFtpResortOrderRequest, CreatePublicCdnOrderRequest, CreateOrderRequest } from "./modules/orders";
export type { CreateActivityCellTreatmentRequest, UpdateActivityCellTreatmentRequest } from "./modules/productivity/activity-cell-treatments";
export type { CreateActivityCellRequest, UpdateActivityCellRequest } from "./modules/productivity/activity-cells";
export type { CreateActivityOfferRequest, UpdateActivityOfferRequest } from "./modules/productivity/activity-offers";
export type { CreateActivityProposalRequest, UpdateActivityProposalRequest, ActivityProposalSearchRequest } from "./modules/productivity/activity-proposals";
export type { CreateActivityRoleRequest, UpdateActivityRoleRequest, AddActivityRoleMembersRequest } from "./modules/productivity/activity-roles";
export type { CreateActivityTreatmentRequest, UpdateActivityTreatmentRequest } from "./modules/productivity/activity-treatments";
export type { CreateAnnotationRequest } from "./modules/productivity/annotations";
export type { CreateAttachmentVersionRequest } from "./modules/productivity/attachment-versions";
export type { CreateAttachmentRequest, UpdateAttachmentRequest, AttachmentSearchRequest } from "./modules/productivity/attachments";
export type { CreateCommitmentRequest, UpdateCommitmentRequest, CommitmentSearchRequest } from "./modules/productivity/commitments";
export type { UpdateContentPlanRequest, AddContentPlanActivitiesRequest, ShareContentPlanRequest } from "./modules/productivity/content-plans";
export type { CreateDigitalAssetRenditionRequest } from "./modules/productivity/digital-asset-renditions";
export type { CreateDigitalAssetVersionRequest, UpdateDigitalAssetVersionTagsRequest } from "./modules/productivity/digital-asset-versions";
export type { CreateDigitalAssetRequest, UpdateDigitalAssetRequest } from "./modules/productivity/digital-assets";
export type { UpdateExtendedAttributePicklistRequest } from "./modules/productivity/extended-attribute-options";
export type { CreateFinancialHierarchyRequest, UpdateFinancialHierarchyRequest } from "./modules/productivity/financial-hierarchies";
export type { CreateFundingAccountRequest, UpdateFundingAccountRequest } from "./modules/productivity/funding-accounts";
export type { CreateGenericObjectRequest, UpdateGenericObjectRequest, GenericObjectSearchRequest } from "./modules/productivity/generic-objects";
export type { CreateGroupRequest, UpdateGroupRequest, GroupSearchRequest } from "./modules/productivity/groups";
export type { CreateInvoiceRequest, UpdateInvoiceRequest, InvoiceSearchRequest } from "./modules/productivity/invoices";
export type { CreateJournalVoucherRequest, UpdateJournalVoucherRequest, JournalVoucherSearchRequest } from "./modules/productivity/journal-vouchers";
export type { LookupQueryParams } from "./modules/productivity/lookup-lists";
export type { UpdateRegionPreferencesRequest } from "./modules/productivity/my-preferences";
export type { CreateOfferRequest, UpdateOfferRequest } from "./modules/productivity/offers";
export type { ProgramProposalSearchRequest } from "./modules/productivity/program-proposals";
export type { UpdateProgramRequest } from "./modules/productivity/programs";
export type { CreateProjectRequest, UpdateProjectRequest, CreateProjectRoleRequest, ProjectAttachmentLinkRequest } from "./modules/productivity/projects";
export type { ResourceQueryRequest, ResourceQueryResponse } from "./modules/productivity/resources";
export type { CreateSupplierRequest, UpdateSupplierRequest, SupplierSearchRequest } from "./modules/productivity/suppliers";
export type { CreateSimpleTaskRequest, UpdateTaskRequest, TaskSearchRequest, DelegateTaskRequest } from "./modules/productivity/tasks";
export type { UpdateTreatmentRequest, TreatmentSearchRequest } from "./modules/productivity/treatments";
export type { ChunkUploadCheckParams, ChunkUploadCompleteRequest, ChunkUploadOptions } from "./modules/productivity/uploader";
export type { CreateUserRoleRequest, UpdateUserRoleRequest } from "./modules/productivity/user-roles";
export type { CreatePublicLinkRequest, UpdatePublicLinkRequest } from "./modules/public-links";
export type { CreateRecordRequest, UpdateRecordRequest, CreateRecordResponse } from "./modules/records";
export type { CreateRuleRequest, UpdateRuleRequest, CreateRuleResponse } from "./modules/rules";
export type { SearchExpression, ClassificationSearchRequest, RecordSearchRequest, Facet, FacetValue } from "./modules/search";
export type { CreateSettingCategoryRequest, UpdateSettingCategoryRequest } from "./modules/setting-categories";
export type { CreateBooleanSettingDefinitionRequest, CreateTextSettingDefinitionRequest, CreateNumericSettingDefinitionRequest, CreateDateTimeSettingDefinitionRequest, CreateEncryptedTextSettingDefinitionRequest, CreateXmlSettingDefinitionRequest, CreateReferenceSettingDefinitionRequest, CreateRoleSettingDefinitionRequest, CreateSettingDefinitionRequest, UpdateSettingDefinitionRequest } from "./modules/setting-definitions";
export type { CreateTranslationRequest, UpdateTranslationRequest, CreateTranslationResponse } from "./modules/translations";
export type { UploadTokenResponse, UploadSegmentSetupResponse, UploadCommitResponse, UploadOptions } from "./modules/uploader";

// Modules that declare the same type name are re-exported explicitly so each
// one keeps a distinct name at the package root.
export type { CreateUserRequest, UpdateUserRequest } from "./modules/users";
export type {
  PermissionUpdate,
  UpdatePermissionsRequest,
} from "./model/PermissionUpdate";
export type {
  CreateUserGroupRequest,
  UpdateUserGroupRequest,
  CreateUserGroupResponse,
} from "./modules/user-groups";
export type {
  ClassificationFieldUpdate,
  ClassificationParent,
  CreateClassificationRequest,
  UpdateClassificationRequest,
  CreateClassificationResponse,
  ClassificationPermissionActions,
  UpdateClassificationTreePermissionsRequest,
  UpdateClassificationRecordPermissionsRequest,
  UpdateClassificationDownloadPermissionsRequest,
} from "./modules/classifications";
export type {
  CreateStaticCollectionRequest,
  CreateDynamicCollectionRequest,
  CreateDynamicCollectionWithSubExpressionsRequest,
  CreateCollectionResponse,
  UpdateStaticCollectionRecordsRequest,
  CollectionPermissionActions,
  UpdateCollectionPermissionsRequest,
  CreateCollectionCommentRequest,
  UpdateCollectionCommentRequest,
  MarkCollectionCommentsReadRequest,
  CreateCollectionCommentResponse,
  UpdateCollectionRequest,
} from "./modules/collections";
export type {
  CreateUserRequest as CreatePmUserRequest,
  UpdateUserRequest as UpdatePmUserRequest,
  UserSearchRequest as PmUserSearchRequest,
} from "./modules/productivity/users";
export type {
  CreateActivityRequest,
  UpdateActivityRequest,
} from "./modules/productivity/activities";
export type {
  CreateActivityMilestoneRequest,
} from "./modules/productivity/activity-milestones";
