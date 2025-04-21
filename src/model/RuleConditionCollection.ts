import { ApiLink } from "./ApiLink";
import { ClassificationLinkedRuleCondition } from "./ClassificationLinkedRuleCondition";
import { ClassificationUnlinkedRuleCondition } from "./ClassificationUnlinkedRuleCondition";
import { ClassifiedInRuleCondition } from "./ClassifiedInRuleCondition";
import { CompareFieldValueRuleCondition } from "./CompareFieldValueRuleCondition";
import { ContentTypeChangedRuleCondition } from "./ContentTypeChangedRuleCondition";
import { ContentTypeChangedToRuleCondition } from "./ContentTypeChangedToRuleCondition";
import { ContentTypeIsRuleCondition } from "./ContentTypeIsRuleCondition";
import { CurrentlyLoggedOnUserRuleCondition } from "./CurrentlyLoggedOnUserRuleCondition";
import { FileAddedRuleCondition } from "./FileAddedRuleCondition";
import { HasFieldValueChangedRuleCondition } from "./HasFieldValueChangedRuleCondition";
import { MasterPreviewChangedRuleCondition } from "./MasterPreviewChangedRuleCondition";
import { MasterPreviewExistsRuleCondition } from "./MasterPreviewExistsRuleCondition";
import { MovieAddedWithoutMoviePreviewRuleCondition } from "./MovieAddedWithoutMoviePreviewRuleCondition";
import { ObjectChangedRuleCondition } from "./ObjectChangedRuleCondition";
import { ObjectCreatedOrChangedRuleCondition } from "./ObjectCreatedOrChangedRuleCondition";
import { ObjectCreatedRuleCondition } from "./ObjectCreatedRuleCondition";
import { ObjectDeletedRuleCondition } from "./ObjectDeletedRuleCondition";
import { RecordStatusChangedRuleCondition } from "./RecordStatusChangedRuleCondition";
import { RecordStatusChangedToRuleCondition } from "./RecordStatusChangedToRuleCondition";
import { RecordStatusIsRuleCondition } from "./RecordStatusIsRuleCondition";
import { ReferenceRuleCondition } from "./ReferenceRuleCondition";

export type RuleCondition =
  | ClassificationLinkedRuleCondition
  | ClassificationUnlinkedRuleCondition
  | ClassifiedInRuleCondition
  | CompareFieldValueRuleCondition
  | ContentTypeChangedRuleCondition
  | ContentTypeChangedToRuleCondition
  | ContentTypeIsRuleCondition
  | CurrentlyLoggedOnUserRuleCondition
  | FileAddedRuleCondition
  | HasFieldValueChangedRuleCondition
  | MasterPreviewChangedRuleCondition
  | MasterPreviewExistsRuleCondition
  | MovieAddedWithoutMoviePreviewRuleCondition
  | ObjectChangedRuleCondition
  | ObjectCreatedOrChangedRuleCondition
  | ObjectCreatedRuleCondition
  | ObjectDeletedRuleCondition
  | RecordStatusChangedRuleCondition
  | RecordStatusChangedToRuleCondition
  | RecordStatusIsRuleCondition
  | ReferenceRuleCondition;

export interface RuleConditionCollection {
  items: RuleCondition[];
  _links: RuleConditionCollectionLinks;
}

export interface RuleConditionCollectionLinks {
  self: ApiLink;
}
