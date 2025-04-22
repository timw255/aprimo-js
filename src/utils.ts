import { Expander } from "./expander";
import { QueryParams } from "./model/QueryParams";
import { SetActions } from "./model/SetActions";

export function buildHeaders(
  params?: QueryParams,
  expander?: Expander,
): Record<string, string> {
  return {
    ...queryParamsToHeaders(params),
    ...(expander?.getHeaders?.() ?? {}),
  };
}

export function queryParamsToHeaders(
  params: QueryParams = {},
): Record<string, string> {
  const headers: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      headers[key] = String(value);
    }
  }

  return headers;
}

export function computeSetActions<T>(
  newItems: T[],
  previousItems: T[],
  getKey: (item: T) => string = (item) => String(item),
): SetActions<T> | undefined {
  const newMap = new Map(newItems.map((item) => [getKey(item), item]));
  const prevMap = new Map(previousItems.map((item) => [getKey(item), item]));

  const addOrUpdate: T[] = [];
  const remove: T[] = [];

  for (const [key, newItem] of newMap) {
    const prevItem = prevMap.get(key);
    if (!prevItem || JSON.stringify(prevItem) !== JSON.stringify(newItem)) {
      addOrUpdate.push(newItem);
    }
  }

  for (const key of prevMap.keys()) {
    if (!newMap.has(key)) {
      remove.push(prevMap.get(key)!);
    }
  }

  if (addOrUpdate.length === 0 && remove.length === 0) {
    return undefined;
  }

  const result: Partial<SetActions<T>> = {};
  if (addOrUpdate.length > 0) result.addOrUpdate = addOrUpdate;
  if (remove.length > 0) result.remove = remove;

  return result as SetActions<T>;
}
