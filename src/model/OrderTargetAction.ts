/**
 * Represents an action for an order target.
 */
export interface OrderTargetAction {
  /** The action identifier. */
  action: string;
  /** Optional bag of parameters for the action. */
  parameters?: Record<string, unknown>;
  /** Short description of the action. */
  label?: string;
}
