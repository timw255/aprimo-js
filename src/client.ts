import { records } from "./modules/records";
import { collections } from "./modules/collections";
import { fieldDefinitions } from "./modules/field-definitions";
import { classifications } from "./modules/classifications";
import { contentTypes } from "./modules/content-types";
import { rules } from "./modules/rules";
import { users } from "./modules/users";
import { userGroups } from "./modules/user-groups";
import { fieldGroups } from "./modules/field-groups";
import { fileTypes } from "./modules/file-types";
import { settingCategories } from "./modules/setting-categories";
import { settingDefinitions } from "./modules/setting-definitions";
import { search } from "./modules/search";
import { auditTrail } from "./modules/audit-trail";
import { downloadLinks } from "./modules/download-links";
import { maintenanceJobs } from "./modules/maintenance-jobs";
import { orders } from "./modules/orders";
import { permissions } from "./modules/permissions";
import { HttpClient } from "./http";
import { translations } from "./modules/translations";
import { uploader } from "./modules/uploader";
import { settings } from "./modules/settings";
import { publicLinks } from "./modules/public-links";
import { recordLocks } from "./modules/record-locks";
import { files } from "./modules/files";
import { languages } from "./modules/languages";

export type ApiResult<T> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: {
    type?: string;
    message?: string;
    raw?: unknown;
  };
};

export class Aprimo {
  private readonly damHttp: HttpClient;
  private readonly moHttp: HttpClient;
  private readonly environment: string;
  private readonly damUrl: string;
  private readonly moUrl: string;

  public auditTrail: ReturnType<typeof auditTrail>;
  public classifications: ReturnType<typeof classifications>;
  public collections: ReturnType<typeof collections>;
  public contentTypes: ReturnType<typeof contentTypes>;
  public downloadLinks: ReturnType<typeof downloadLinks>;
  public fieldDefinitions: ReturnType<typeof fieldDefinitions>;
  public fieldGroups: ReturnType<typeof fieldGroups>;
  public files: ReturnType<typeof files>;
  public fileTypes: ReturnType<typeof fileTypes>;
  public languages: ReturnType<typeof languages>;
  public maintenanceJobs: ReturnType<typeof maintenanceJobs>;
  public orders: ReturnType<typeof orders>;
  public permissions: ReturnType<typeof permissions>;
  public publicLinks: ReturnType<typeof publicLinks>;
  public recordLocks: ReturnType<typeof recordLocks>;
  public records: ReturnType<typeof records>;
  public rules: ReturnType<typeof rules>;
  public search: ReturnType<typeof search>;
  public settingCategories: ReturnType<typeof settingCategories>;
  public settingDefinitions: ReturnType<typeof settingDefinitions>;
  public settings: ReturnType<typeof settings>;
  public translations: ReturnType<typeof translations>;
  public uploader: ReturnType<typeof uploader>;
  public users: ReturnType<typeof users>;
  public userGroups: ReturnType<typeof userGroups>;

  /**
   * @internal
   */
  constructor(environment: string, tokenProvider: () => Promise<string>) {
    this.environment = environment;

    this.damUrl = `https://${this.environment}.dam.aprimo.com`;
    this.moUrl = `https://${this.environment}.aprimo.com`;

    this.damHttp = new HttpClient(tokenProvider, this.damUrl, {
      "API-VERSION": "1",
      Accept: "application/hal+json",
      "Content-Type": "application/json",
    });

    this.moHttp = new HttpClient(tokenProvider, this.moUrl, {
      Accept: "application/hal+json",
    });

    this.auditTrail = auditTrail(this.damHttp);
    this.classifications = classifications(this.damHttp);
    this.collections = collections(this.damHttp);
    this.contentTypes = contentTypes(this.damHttp);
    this.downloadLinks = downloadLinks(this.damHttp);
    this.fieldDefinitions = fieldDefinitions(this.damHttp);
    this.fieldGroups = fieldGroups(this.damHttp);
    this.files = files(this.damHttp);
    this.fileTypes = fileTypes(this.damHttp);
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
  }
}
