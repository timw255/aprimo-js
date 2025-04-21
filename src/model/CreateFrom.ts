export type CreateFrom<T> = Partial<
  Omit<T, "id" | "createdOn" | "modifiedOn" | "_links" | "_embedded">
>;
