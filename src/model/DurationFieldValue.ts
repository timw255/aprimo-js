/**
 * Language-specific values for a DurationField. Format is [-][d.]hh:mm:ss[.fffffff]
 * (e.g. "1.02:30:00") where the optional negative sign indicates a negative duration,
 * the optional days component is followed by a period, hours/minutes/seconds are
 * required, and fractional seconds are optional.
 */
export interface DurationFieldValue {
  /** Indicates if the value was influenced by AI. */
  aiInfluenced: boolean;
  /** The language identifier. */
  languageId: string;
  /** When the value was last modified. Format: date-time. */
  modifiedOn: string;
  /** Whether the value is read-only. */
  readOnly: boolean;
  /** The duration value in [-][d.]hh:mm:ss[.fffffff] format. */
  value: string;
}
