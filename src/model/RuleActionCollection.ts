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
import { CreateActivityRuleAction } from "./CreateActivityRuleAction";
import { EnhancedCaptioningRuleAction } from "./EnhancedCaptioningRuleAction";
import { PredictiveMetadataRuleAction } from "./PredictiveMetadataRuleAction";
import { ResolveContentTypeRuleAction } from "./ResolveContentTypeRuleAction";
import { RunReviewAgentRuleAction } from "./RunReviewAgentRuleAction";
import { RunTextMatchRuleAction } from "./RunTextMatchRuleAction";
import { RunTranslationAgentRuleAction } from "./RunTranslationAgentRuleAction";
import { VideoSummaryRuleAction } from "./VideoSummaryRuleAction";
import { ReferenceRuleAction } from "./ReferenceRuleAction";
import { RefreshFilesRuleAction } from "./RefreshFilesRuleAction";
import { ScheduleResaveOfRecordRuleAction } from "./ScheduleResaveOfRecordRuleAction";
import { SendEmailRuleAction } from "./SendEmailRuleAction";
import { SetFieldValueRuleAction } from "./SetFieldValueRuleAction";
import { UnclassifyRecordRuleAction } from "./UnclassifyRecordRuleAction";

/**
 * Polymorphic union of rule action types, discriminated by `actionType`.
 * The API defines each action type as a separate shape sharing the
 * `actionType` discriminator enum.
 */
export type RuleAction =
  | ApplyWatermarkOnMasterFileRuleAction
  | AprimoAIRuleAction
  | ChangeContentTypeRuleAction
  | ChangeRecordStatusRuleAction
  | ClassifyRecordRuleAction
  | CreateActivityRuleAction
  | CreatePresetCropsRuleAction
  | CreatePublicUrisRuleAction
  | CreateRenditionsRuleAction
  | CreateReviewFileRuleAction
  | DeletePublicUrisRuleAction
  | EnhancedCaptioningRuleAction
  | PredictiveMetadataRuleAction
  | ReferenceRuleAction
  | RefreshFilesRuleAction
  | ResolveContentTypeRuleAction
  | RunReviewAgentRuleAction
  | RunTextMatchRuleAction
  | RunTranslationAgentRuleAction
  | ScheduleResaveOfRecordRuleAction
  | SendEmailRuleAction
  | SetFieldValueRuleAction
  | UnclassifyRecordRuleAction
  | VideoSummaryRuleAction
  | AprimoAIUpdatePerformanceRuleAction;

/**
 * Representation of a collection of rule actions (polymorphic).
 */
export interface RuleActionCollection {
  /** A collection of rule action items (various action types like ApplyWatermarkOnMasterFile, ClassifyRecordRuleAction, SendEmailRuleAction, etc.). */
  items: RuleAction[];
  /** HAL `_links` block. */
  _links: RuleActionCollectionLinks;
}

/**
 * HAL `_links` block for a {@link RuleActionCollection}.
 */
export interface RuleActionCollectionLinks {
  /** Self link to this collection. */
  self: ApiLink;
}
