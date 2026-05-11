/**
 * A named counter with a numeric value.
 */
export interface Counter {
  /** The name of the counter. */
  name: string;
  /** The current value of the counter. Format: int64. */
  value: number;
}
