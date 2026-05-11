/**
 * Set-style action envelope used across the SDK to upsert and remove items
 * on collection-valued request fields (e.g. record `fields`, `classifications`,
 * field-group `members`, user/user-group `permissions`).
 *
 * The element type `T` varies by parent — typically `{ id: string, ... }` for
 * id-keyed children, or richer shapes like `Field` / `Permission` / `OptionListItemDefinition`
 * for value-bearing children. Only include the actions you want to apply;
 * omit the envelope entirely to leave the field untouched.
 *
 * Use `computeSetActions` (re-exported from the package root) to diff a
 * desired list against the current state and produce the right envelope.
 *
 * @example
 * ```ts
 * // Upsert two field values, remove one classification:
 * await aprimo.records.update(id, {
 *   fields: {
 *     addOrUpdate: [
 *       { fieldId, localizedValues: [{ languageId, value: "Hi" }] },
 *     ],
 *   },
 *   classifications: {
 *     addOrUpdate: [{ id: newClassificationId }],
 *     remove: [{ id: oldClassificationId }],
 *   },
 * });
 * ```
 */
export interface SetActions<T> {
  /** Items to insert or update. Existing items are matched by their identifying key (typically `id`). */
  addOrUpdate?: T[];
  /** Items to remove. Element shape depends on the parent — usually `{ id: string }`. */
  remove?: T[];
}
