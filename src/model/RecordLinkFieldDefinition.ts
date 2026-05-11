import { BaseFieldDefinition } from "./BaseFieldDefinition";
import { HelpText } from "./HelpText";
import { Label } from "./Label";
import { ApiLink } from "./ApiLink";
import { User } from "./User";

/**
 * The type of relationship represented by a record link.
 */
export type RecordLinkType =
  | "OneParentOneChild"
  | "OneParentManyChildren"
  | "OneParentOrderedChildren"
  | "ManyParentsOneChild"
  | "ManyParentsManyChildren"
  | "ManyParentsOrderedChildren"
  | "NoParentChildRelationship";

/**
 * Representation of the definition of a RecordLinkField. Parent/child/link
 * relationships to other records.
 *
 * Spec schema: `Recordlinkfielddefinition`. Discriminator value: `dataType = "recordlink"`.
 */
export interface RecordLinkFieldDefinition extends BaseFieldDefinition {
  /** Classification IDs that limit which records can be used as children. A record must be classified in at least one. */
  childClassifications: string[];
  /** Content types that a child record can be. */
  childContentTypes: string[];
  /** Help text for the linked child records in the language of the currently logged on user. */
  childHelpText: string;
  /** Collection of language-dependent help texts for linked child records. */
  childHelpTexts: HelpText[];
  /** Label for the linked child records in the language of the currently logged on user. */
  childLabel: string;
  /** Collection of language-dependent labels for linked child records. */
  childLabels: Label[];
  /** Classification IDs for `NoParentChildRelationship` link type. A record can be linked if classified in at least one. */
  linkClassifications: string[];
  /** Content types that a linked record can be. */
  linkContentTypes: string[];
  /** The type of record link represented by the field. */
  linkType: RecordLinkType;
  /** Classification IDs that limit which records can be used as parents. A record must be classified in at least one. */
  parentClassifications: string[];
  /** Content types that a parent record can be. */
  parentContentTypes: string[];
  /** Help text for the linked parent records in the language of the currently logged on user. */
  parentHelpText: string;
  /** Collection of language-dependent help texts for linked parent records. */
  parentHelpTexts: HelpText[];
  /** Label for the linked parent records in the language of the currently logged on user. */
  parentLabel: string;
  /** Collection of language-dependent labels for linked parent records. */
  parentLabels: Label[];
  /** Indication if an image must be shown in the record selection list. */
  showSummaryImage: boolean;
  /** Id of the field that represents the record in a record selection list. */
  summaryFieldId: string;
}

/**
 * HAL `_links` map for {@link RecordLinkFieldDefinition}.
 */
export interface RecordLinkFieldDefinitionLinks {
  /** Link to this record link field definition resource. */
  self: ApiLink;
  /** Link to the user who created this field definition. */
  createdby: ApiLink<User>;
  /** Link to the user who last modified this field definition. */
  modifiedby: ApiLink<User>;
}
