import { BaseFieldDefinition } from "./BaseFieldDefinition";
import { HelpText } from "./HelpText";
import { Label } from "./Label";
import { ApiLink } from "./ApiLink";
import { User } from "./User";

export type RecordLinkType =
  | "OneParentOneChild"
  | "OneParentManyChildren"
  | "OneParentOrderedChildren"
  | "ManyParentsOneChild"
  | "ManyParentsManyChildren"
  | "ManyParentsOrderedChildren"
  | "NoParentChildRelationship";

export interface RecordLinkFieldDefinition extends BaseFieldDefinition {
  childClassifications: string[];
  childContentTypes: string[];
  childHelpText: string;
  childHelpTexts: HelpText[];
  childLabel: string;
  childLabels: Label[];
  linkClassifications: string[];
  linkContentTypes: string[];
  linkType: RecordLinkType;
  parentClassifications: string[];
  parentContentTypes: string[];
  parentHelpText: string;
  parentHelpTexts: HelpText[];
  parentLabel: string;
  parentLabels: Label[];
  showSummaryImage: boolean;
  summaryFieldId: string;
}

export interface RecordLinkFieldDefinitionLinks {
  self: ApiLink;
  createdby: ApiLink<User>;
  modifiedby: ApiLink<User>;
}
