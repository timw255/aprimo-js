import { additionalFiles } from "./modules/additional-files";
import { records } from "./modules/records";
import { checks } from "./modules/checks";
import { collections } from "./modules/collections";
import { fieldDefinitions } from "./modules/field-definitions";
import { classifications } from "./modules/classifications";
import { contentTypes } from "./modules/content-types";
import { rules } from "./modules/rules";
import { users } from "./modules/users";
import { userGroups } from "./modules/user-groups";
import { fieldGroups } from "./modules/field-groups";
import { fileTypes } from "./modules/file-types";
import { fileVersions } from "./modules/file-versions";
import { settingCategories } from "./modules/setting-categories";
import { settingDefinitions } from "./modules/setting-definitions";
import { search } from "./modules/search";
import { auditTrail } from "./modules/audit-trail";
import { downloadLinks } from "./modules/download-links";
import { maintenanceJobs } from "./modules/maintenance-jobs";
import { orders } from "./modules/orders";
import { permissions } from "./modules/permissions";
import { HttpClient, HttpClientOptions } from "./http";
import { translations } from "./modules/translations";
import { uploader } from "./modules/uploader";
import { settings } from "./modules/settings";
import { publicLinks } from "./modules/public-links";
import { recordLocks } from "./modules/record-locks";
import { files } from "./modules/files";
import { languages } from "./modules/languages";
import { productivity } from "./modules/productivity";
import { AprimoError } from "./errors";

/**
 * Standard envelope returned by every SDK call.
 *
 * `ok` is `true` for HTTP 2xx responses; `data` is then populated. On failure,
 * `error` is an instance of `AprimoError` (or one of its subclasses like
 * `AprimoNotFoundError`, `AprimoRateLimitError`, etc.) — use `instanceof` to
 * narrow it. `error.type`, `error.message`, and `error.raw` are still
 * available for backward compatibility with the SDK's earlier stringly-typed
 * error shape.
 *
 * @example
 * ```ts
 * import { AprimoNotFoundError, AprimoRateLimitError } from "aprimo-js";
 *
 * const res = await aprimo.records.getById(id);
 * if (!res.ok) {
 *   if (res.error instanceof AprimoNotFoundError) {
 *     // No such record.
 *   } else if (res.error instanceof AprimoRateLimitError) {
 *     // Server asked us to slow down — res.error.retryAfter has the hint.
 *   } else {
 *     console.error(res.error?.message);
 *   }
 * }
 * ```
 */
export type ApiResult<T> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: AprimoError;
};

/**
 * The Aprimo SDK client. Each public property is a module wrapping a slice of
 * the Aprimo REST API. Construct via `createClient(...)` rather than `new`.
 *
 * Grouping (purely visual — all modules sit on the same instance):
 * - **Records & files**: records, files, fileVersions, fileTypes, additionalFiles, recordLocks, uploader
 * - **Taxonomy & metadata**: classifications, contentTypes, fieldDefinitions, fieldGroups, languages, translations
 * - **Discovery**: search, collections
 * - **Access & permissions**: permissions, users, userGroups
 * - **Sharing**: downloadLinks, publicLinks
 * - **Operations**: auditTrail, checks, maintenanceJobs, orders, rules, settings, settingCategories, settingDefinitions
 * - **Productivity (PM)**: productivity (sub-module tree for the PM API)
 */
export class Aprimo {
  private readonly damHttp: HttpClient;
  private readonly moHttp: HttpClient;
  private readonly pmHttp: HttpClient;
  private readonly environment: string;
  private readonly damUrl: string;
  private readonly moUrl: string;

  // --- Records & files ---

  /** DAM records (assets) — create, read, update, delete, paged listing. */
  public records: ReturnType<typeof records>;
  /** File-level operations: check-out / check-in to lock during version uploads. */
  public files: ReturnType<typeof files>;
  /** File version metadata for a record's master file. */
  public fileVersions: ReturnType<typeof fileVersions>;
  /** File-type definitions (mime-type / extension mappings). */
  public fileTypes: ReturnType<typeof fileTypes>;
  /** Additional (non-master) files attached to a file version. */
  public additionalFiles: ReturnType<typeof additionalFiles>;
  /** Record-level locks separate from file check-out. */
  public recordLocks: ReturnType<typeof recordLocks>;
  /** Upload files to Aprimo and receive an upload token to attach to records. */
  public uploader: ReturnType<typeof uploader>;

  // --- Taxonomy & metadata ---

  /** Classification tree (hierarchical taxonomy) and its permissions. */
  public classifications: ReturnType<typeof classifications>;
  /** Content-type definitions (the schemas records are stamped with). */
  public contentTypes: ReturnType<typeof contentTypes>;
  /** Field definitions (the metadata schema fields available on records). */
  public fieldDefinitions: ReturnType<typeof fieldDefinitions>;
  /** Field groups (collections of related field definitions). */
  public fieldGroups: ReturnType<typeof fieldGroups>;
  /** Configured tenant languages. */
  public languages: ReturnType<typeof languages>;
  /** UI/label translations. */
  public translations: ReturnType<typeof translations>;

  // --- Discovery ---

  /** Search records and classifications by Aprimo search expression. */
  public search: ReturnType<typeof search>;
  /** Curated collections of records. */
  public collections: ReturnType<typeof collections>;

  // --- Access & permissions ---

  /** Tenant-wide permissions queries. */
  public permissions: ReturnType<typeof permissions>;
  /** Users in the tenant. */
  public users: ReturnType<typeof users>;
  /** User groups in the tenant. */
  public userGroups: ReturnType<typeof userGroups>;

  // --- Sharing ---

  /** Generate authenticated download links for files/renditions. */
  public downloadLinks: ReturnType<typeof downloadLinks>;
  /** Manage publicly-shareable links to records or renditions. */
  public publicLinks: ReturnType<typeof publicLinks>;

  // --- Operations ---

  /** Read the audit trail for records and other entities. */
  public auditTrail: ReturnType<typeof auditTrail>;
  /** Run validation/integrity checks against the tenant. */
  public checks: ReturnType<typeof checks>;
  /** Schedule and inspect background maintenance jobs. */
  public maintenanceJobs: ReturnType<typeof maintenanceJobs>;
  /** Manage server-side orders (e.g., bulk operations). */
  public orders: ReturnType<typeof orders>;
  /** Tenant rules engine. */
  public rules: ReturnType<typeof rules>;
  /** Tenant settings values. */
  public settings: ReturnType<typeof settings>;
  /** Setting categories. */
  public settingCategories: ReturnType<typeof settingCategories>;
  /** Setting definitions. */
  public settingDefinitions: ReturnType<typeof settingDefinitions>;

  // --- Productivity (PM) ---

  /** Aprimo Productivity (PM) API — activities, projects, tasks, brands, etc. */
  public productivity: ReturnType<typeof productivity>;

  /**
   * @internal
   */
  constructor(
    environment: string,
    tokenProvider: () => Promise<string>,
    options: HttpClientOptions = {},
  ) {
    this.environment = environment;

    this.damUrl = `https://${this.environment}.dam.aprimo.com`;
    this.moUrl = `https://${this.environment}.aprimo.com`;

    this.damHttp = new HttpClient(
      tokenProvider,
      this.damUrl,
      {
        "API-VERSION": "1",
        Accept: "application/hal+json",
        "Content-Type": "application/json",
      },
      options,
    );

    this.moHttp = new HttpClient(
      tokenProvider,
      this.moUrl,
      {
        Accept: "application/hal+json",
      },
      options,
    );

    this.pmHttp = new HttpClient(
      tokenProvider,
      this.moUrl,
      {
        Accept: "application/json",
      },
      options,
    );

    this.additionalFiles = additionalFiles(this.damHttp);
    this.auditTrail = auditTrail(this.damHttp);
    this.checks = checks(this.damHttp);
    this.classifications = classifications(this.damHttp);
    this.collections = collections(this.damHttp);
    this.contentTypes = contentTypes(this.damHttp);
    this.downloadLinks = downloadLinks(this.damHttp);
    this.fieldDefinitions = fieldDefinitions(this.damHttp);
    this.fieldGroups = fieldGroups(this.damHttp);
    this.files = files(this.damHttp);
    this.fileTypes = fileTypes(this.damHttp);
    this.fileVersions = fileVersions(this.damHttp);
    this.languages = languages(this.damHttp);
    this.maintenanceJobs = maintenanceJobs(this.damHttp);
    this.orders = orders(this.damHttp);
    this.permissions = permissions(this.damHttp);
    this.publicLinks = publicLinks(this.damHttp);
    this.recordLocks = recordLocks(this.damHttp);
    this.records = records(this.damHttp);
    this.rules = rules(this.damHttp);
    this.search = search(this.damHttp);
    this.settingCategories = settingCategories(this.damHttp);
    this.settingDefinitions = settingDefinitions(this.damHttp);
    this.settings = settings(this.damHttp);
    this.translations = translations(this.damHttp);
    this.uploader = uploader(this.moHttp);
    this.users = users(this.damHttp);
    this.userGroups = userGroups(this.damHttp);

    this.productivity = productivity(this.pmHttp);
  }
}
