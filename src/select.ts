/**
 * Anything that can contribute `select-*` request headers. Both
 * {@link Select} and `Expander` satisfy this, so SDK methods accept either —
 * or an array of both.
 */
export interface HeaderSource {
  getHeaders(): Record<string, string>;
}

/**
 * Builder for the opt-in *scalar* properties Aprimo omits from a response
 * unless you ask for them — `namePath` on a classification, `tag` and
 * `textContent` on a record, and so on.
 *
 * These travel on the same `select-<TypeName>` header an `Expander` uses for
 * embedded resources, so the two compose: pass both and the SDK merges them
 * into one header.
 *
 * @example
 * ```ts
 * import { Expander, Select } from "aprimo-js";
 * import type { Classification } from "aprimo-js/model";
 *
 * const select = Select.create()
 *   .for<Classification>("Classification").props("namePath");
 *
 * const res = await aprimo.classifications.getById(id, select);
 * // → res.data.namePath is populated instead of null
 * ```
 *
 * @example Combined with an `Expander`:
 * ```ts
 * const expander = Expander.create()
 *   .for<Classification>("Classification").expand("fields");
 *
 * const res = await aprimo.classifications.getById(id, [expander, select]);
 * // → sends `select-Classification: fields,NamePath`
 * ```
 */
export class Select implements HeaderSource {
  private readonly map = new Map<string, Set<string>>();

  /**
   * Start a new selection. Equivalent to `new Select()`.
   */
  static create(): Select {
    return new Select();
  }

  /**
   * Begin a per-type selection chain.
   *
   * @typeParam T - The resource type whose property names are valid on the
   *   returned `props(...)` call. Used only for compile-time validation.
   * @param modelName - The API-side type name used to build the
   *   `select-<modelName>` header (e.g. `"Classification"`, `"Record"`).
   * @returns An object with `props(...names)` — call it with one or more
   *   property names from `T`. `props` returns the `Select` so you can chain
   *   another `.for(...)`.
   */
  for<T>(
    modelName: string,
  ): {
    props: (...names: (keyof T & string)[]) => Select;
  } {
    return {
      props: (...names: (keyof T & string)[]) => {
        if (!this.map.has(modelName)) this.map.set(modelName, new Set());
        const set = this.map.get(modelName)!;
        names.forEach((n) => set.add(toWireName(n)));
        return this;
      },
    };
  }

  /**
   * Internal: serialize the configured selections into HTTP headers. The SDK
   * calls this for you — consumers normally don't need to.
   */
  getHeaders(): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [type, props] of this.map.entries()) {
      result[`select-${type}`] = [...props].join(",");
    }
    return result;
  }
}

/**
 * Model properties are camelCase (`namePath`); the header expects the
 * API-side PascalCase name (`NamePath`).
 */
function toWireName(name: string): string {
  return name.length === 0 ? name : name[0]!.toUpperCase() + name.slice(1);
}
