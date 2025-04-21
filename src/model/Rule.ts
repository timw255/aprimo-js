import { ApiLink } from "./ApiLink";
import { RuleActionCollection } from "./RuleActionCollection";
import { RuleConditionCollection } from "./RuleConditionCollection";
import { User } from "./User";

export type RuleTarget =
  | "SettingDefinition"
  | "FieldDefinition"
  | "IndexerTask"
  | "Translation"
  | "SettingCategory"
  | "UserGroup"
  | "Watermark"
  | "FieldGroup"
  | "Collection"
  | "User"
  | "Classification"
  | "Record"
  | "Language"
  | "FileType"
  | "Organization"
  | "Site"
  | "Publication"
  | "Subscription"
  | "Filestore"
  | "SavedView";

export type RuleTrigger = "WhenSavedOrDeleted" | "Daily";

export interface Rule {
  createdOn: string;
  enabled: boolean;
  expression: string;
  id: string;
  includeDraftRecords: boolean;
  isInternal: boolean;
  modifiedOn: string;
  name: string;
  tag: string;
  target: RuleTarget;
  trigger: RuleTrigger;
  version: number;
  _links: RuleLinks;
  _embedded?: {
    [K in Exclude<keyof RuleLinks, "self">]?: RuleLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

export interface RuleLinks {
  self: ApiLink;
  conditions: ApiLink<RuleConditionCollection>;
  actions: ApiLink<RuleActionCollection>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
