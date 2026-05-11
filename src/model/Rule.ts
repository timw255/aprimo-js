import { ApiLink } from "./ApiLink";
import { RuleActionCollection } from "./RuleActionCollection";
import { RuleConditionCollection } from "./RuleConditionCollection";
import { User } from "./User";

/**
 * Object types that can trigger a rule.
 */
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

/**
 * Trigger that determines when the rule executes.
 */
export type RuleTrigger = "WhenSavedOrDeleted" | "Daily";

/**
 * Representation of a Rule.
 */
export interface Rule {
  /** Gets the creation datetime in UTC time. Format: date-time. */
  createdOn: string;
  /** Is rule enabled. */
  enabled: boolean;
  /** Gets search expression based on conditions that are available for parsing. Applied and visible in response only in case 'trigger' has value 'daily'. */
  expression: string;
  /** Gets the Id of this rule. */
  id: string;
  /** Indicates whether this rule can be executed on draft records. Applied and visible in response only in case 'target' has value 'record'. */
  includeDraftRecords: boolean;
  /** Internal rules can only be edited by operators. */
  isInternal: boolean;
  /** Gets the last modification datetime in UTC time. Format: date-time. */
  modifiedOn: string;
  /** Gets the name of this rule. */
  name: string;
  /** Gets or sets the value of the Tag for this object. The value of this property has to be valid XML code. This property will not be returned by default. In order to include the property in the response, add a header with the name 'select-rule' and the value 'Tag' to your request. */
  tag: string;
  /** Gets the object type that triggers this rule. */
  target: RuleTarget;
  /** Gets the trigger of this rule. */
  trigger: RuleTrigger;
  /** Gets the version of this rule. Format: int32. */
  version: number;
  /** HAL `_links` for this rule (SDK addition; not declared in spec). */
  _links: RuleLinks;
  /** HAL `_embedded` for this rule (SDK addition; not declared in spec). */
  _embedded?: {
    [K in Exclude<keyof RuleLinks, "self">]?: RuleLinks[K] extends ApiLink<
      infer R
    >
      ? R
      : never;
  };
}

/**
 * HAL `_links` block for a {@link Rule}.
 */
export interface RuleLinks {
  /** Self link to this rule. */
  self: ApiLink;
  /** Link to the rule's conditions collection. */
  conditions: ApiLink<RuleConditionCollection>;
  /** Link to the rule's actions collection. */
  actions: ApiLink<RuleActionCollection>;
  /** Link to the user who last modified this rule. */
  modifiedby: ApiLink<User>;
  /** Link to the user who created this rule. */
  createdby: ApiLink<User>;
}
