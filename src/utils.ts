import { QueryParams } from "./model/QueryParams";
import { HeaderSource } from "./select";
import { SetActions } from "./model/SetActions";

export function buildHeaders(
  params?: QueryParams,
  select?: HeaderSource | HeaderSource[],
): Record<string, string> {
  const sources = select === undefined ? [] : Array.isArray(select) ? select : [select];

  return mergeSelectHeaders(
    queryParamsToHeaders(params),
    ...sources.map((s) => s.getHeaders?.() ?? {}),
  );
}

/**
 * Merge header maps, comma-joining values whose keys differ only by case.
 *
 * `Expander` and `Select` both emit `select-<TypeName>` headers, and HTTP
 * header names are case-insensitive while JavaScript object keys are not.
 * Spreading `{ "select-Classification": "fields" }` over
 * `{ "select-classification": "NamePath" }` yields two keys, only one of which
 * reaches the server — silently dropping the other's request.
 */
function mergeSelectHeaders(
  ...maps: Record<string, string>[]
): Record<string, string> {
  const result: Record<string, string> = {};
  const canonical = new Map<string, string>();

  for (const map of maps) {
    for (const [key, value] of Object.entries(map)) {
      const lower = key.toLowerCase();
      const existing = canonical.get(lower);

      if (existing === undefined) {
        canonical.set(lower, key);
        result[key] = value;
        continue;
      }

      const merged = new Set([
        ...result[existing]!.split(",").filter(Boolean),
        ...value.split(",").filter(Boolean),
      ]);
      result[existing] = [...merged].join(",");
    }
  }

  return result;
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

export function buildQueryString(params?: Record<string, unknown>): string {
  if (!params) return "";

  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }

  return parts.length > 0 ? `?${parts.join("&")}` : "";
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
