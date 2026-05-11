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

/**
 * Polymorphic union of rule condition types, discriminated by `conditionType`.
 * The spec defines each condition type as a separate schema sharing the
 * `conditionType` discriminator enum.
 */
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

/**
 * Representation of a collection of rule conditions (polymorphic).
 */
export interface RuleConditionCollection {
  /** A collection of rule condition items (various condition types like ClassifiedInRuleCondition, ObjectCreatedRuleCondition, etc.). */
  items: RuleCondition[];
  /** HAL `_links` block (SDK addition; not declared in spec). */
  _links: RuleConditionCollectionLinks;
}

/**
 * HAL `_links` block for a {@link RuleConditionCollection}.
 */
export interface RuleConditionCollectionLinks {
  /** Self link to this collection. */
  self: ApiLink;
}
