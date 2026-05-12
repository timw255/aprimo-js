/**
 * One value within a {@link SystemTypeCollection} entry — a numeric id
 * paired with an optional localization resource and an active flag.
 * Localized labels live in the `resources` module under `resourceId`.
 */
export interface SystemTypeItem {
  /** Numeric id sent to the API in payloads. */
  systemTypeId: number;
  /** Resource id used to resolve a localized label (see `resources`). */
  resourceId?: string;
  /** Active flag. */
  activeFlag: number;
}
