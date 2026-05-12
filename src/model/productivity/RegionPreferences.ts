/**
 * Per-user region/locale preferences. Returned and updated via the
 * `myPreferences` module; the same shape is mirrored on the {@link User}
 * record itself for read-only display elsewhere.
 *
 * Every value is a tenant-configured numeric id — resolve human-readable
 * labels via {@link systemTypes} or {@link resources}.
 */
export interface RegionPreferences {
  /** Locale id. */
  localeId: number;
  /** Language id. */
  languageId: number;
  /** Date-format id. */
  dateFormat: number;
  /** Time-format id. */
  timeFormat: number;
  /** Number-format id. */
  numberFormatId: number;
  /** Time-zone id. */
  timezoneId: number;
  /** Default currency code id. */
  currencyCode: number;
  /** Default paper-size id for reports/exports. */
  paperSize: number;
  /** Auto-save preference (`1` enabled). */
  autoSave: number;
  /** UI theme id. */
  themeId: number;
}
