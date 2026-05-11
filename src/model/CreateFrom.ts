/**
 * SDK-internal generic helper that derives the shape of a "create" request
 * body from a resource type by stripping server-managed fields (`id`,
 * `createdOn`, `modifiedOn`, `_links`, `_embedded`) and making the remainder
 * optional.
 */
export type CreateFrom<T> = Partial<
  Omit<T, "id" | "createdOn" | "modifiedOn" | "_links" | "_embedded">
>;
