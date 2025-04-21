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

export interface RuleActionCollection {
  items: RuleAction[];
  _links: RuleActionCollectionLinks;
}

export interface RuleActionCollectionLinks {
  self: ApiLink;
}
