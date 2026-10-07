/**
 * Specifies when a rule action runs: immediately, or queued and run later.
 */
export type ExecutionTime = "Delayed" | "Immediately";

/**
 * Execution time for the rule actions that only run queued. Thirteen of the
 * twenty-five actions reject `"Immediately"` with "Such ExecutionTime not
 * allowed to set for rule action ...".
 */
export type DelayedExecutionTime = Extract<ExecutionTime, "Delayed">;
