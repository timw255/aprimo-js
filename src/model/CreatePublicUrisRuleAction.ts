import { ExecutionTime } from "./ExecutionTime";
import { PublicUriPreset } from "./PublicUriPreset";

export interface CreatePublicUrisRuleAction {
  actionType: "CreatePublicLinks";
  executionTime?: ExecutionTime;
  index?: number;
  presets: PublicUriPreset[];
}
