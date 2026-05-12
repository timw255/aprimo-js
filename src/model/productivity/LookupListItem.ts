/**
 * One item in a {@link LookupList} — a (key, label, active) triple.
 * `key` is the numeric value to send on writes; `value` is the
 * human-readable label.
 */
export interface LookupListItem {
  /** Numeric id sent to the API in payloads. */
  key: number;
  /** Human-readable display label. */
  value: string;
  /** Whether the item is currently selectable. */
  active: boolean;
}
