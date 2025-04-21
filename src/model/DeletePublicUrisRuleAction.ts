import { ExecutionTime } from "./ExecutionTime";
import { PublicUriPreset } from "./PublicUriPreset";

export interface DeletePublicUrisRuleAction {
  actionType: "DeletePublicLinks";
  executionTime?: ExecutionTime;
  index?: number;
  presets: PublicUriPreset[];
}
