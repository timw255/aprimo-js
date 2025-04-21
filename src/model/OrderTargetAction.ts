export interface OrderTargetAction {
  action: string;
  parameters?: Record<string, unknown>;
  label?: string;
}
