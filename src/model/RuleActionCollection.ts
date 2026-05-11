import { ApiLink } from "./ApiLink";
import { ApplyWatermarkOnMasterFileRuleAction } from "./ApplyWatermarkOnMasterFileRuleAction";
import { AprimoAIRuleAction } from "./AprimoAIRuleAction";
import { AprimoAIUpdatePerformanceRuleAction } from "./AprimoAIUpdatePerformanceRuleAction";
import { ChangeContentTypeRuleAction } from "./ChangeContentTypeRuleAction";
import { ChangeRecordStatusRuleAction } from "./ChangeRecordStatusRuleAction";
import { ClassifyRecordRuleAction } from "./ClassifyRecordRuleAction";
import { CreatePresetCropsRuleAction } from "./CreatePresetCropsRuleAction";
import { CreatePublicUrisRuleAction } from "./CreatePublicUrisRuleAction";
import { CreateRenditionsRuleAction } from "./CreateRenditionsRuleAction";
import { CreateReviewFileRuleAction } from "./CreateReviewFileRuleAction";
import { DeletePublicUrisRuleAction } from "./DeletePublicUrisRuleAction";
import { ReferenceRuleAction } from "./ReferenceRuleAction";
import { RefreshFilesRuleAction } from "./RefreshFilesRuleAction";
import { ScheduleResaveOfRecordRuleAction } from "./ScheduleResaveOfRecordRuleAction";
import { SendEmailRuleAction } from "./SendEmailRuleAction";
import { SetFieldValueRuleAction } from "./SetFieldValueRuleAction";
import { UnclassifyRecordRuleAction } from "./UnclassifyRecordRuleAction";

/**
 * Polymorphic union of rule action types, discriminated by `actionType`.
 * The spec defines each action type as a separate schema sharing the
 * `actionType` discriminator enum.
 */
export type RuleAction =
  | ApplyWatermarkOnMasterFileRuleAction
  | AprimoAIRuleAction
  | ChangeContentTypeRuleAction
  | ChangeRecordStatusRuleAction
  | ClassifyRecordRuleAction
  | CreatePresetCropsRuleAction
  | CreatePublicUrisRuleAction
  | CreateRenditionsRuleAction
  | CreateReviewFileRuleAction
  | DeletePublicUrisRuleAction
  | ReferenceRuleAction
  | RefreshFilesRuleAction
  | ScheduleResaveOfRecordRuleAction
  | SendEmailRuleAction
  | SetFieldValueRuleAction
  | UnclassifyRecordRuleAction
  | AprimoAIUpdatePerformanceRuleAction;

/**
 * Representation of a collection of rule actions (polymorphic).
 */
export interface RuleActionCollection {
  /** A collection of rule action items (various action types like ApplyWatermarkOnMasterFile, ClassifyRecordRuleAction, SendEmailRuleAction, etc.). */
  items: RuleAction[];
  /** HAL `_links` block (SDK addition; not declared in spec). */
  _links: RuleActionCollectionLinks;
}

/**
 * HAL `_links` block for a {@link RuleActionCollection}.
 */
export interface RuleActionCollectionLinks {
  /** Self link to this collection. */
  self: ApiLink;
}
