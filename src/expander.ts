/**
 * Builder for the `select-<TypeName>` request headers Aprimo uses to embed
 * related resources in a response. Pass an `Expander` to any module method
 * that accepts one (records, files, classifications, etc.) to populate the
 * response's `_embedded` tree.
 *
 * `for<T>(name)` takes the resource type both as a TypeScript type parameter
 * (used for compile-time validation of expandable field names against
 * `T["_embedded"]`) and as a string (used as the API-side type name in the
 * generated header — e.g. `select-Record: masterfile,fields`). The two are
 * separate inputs because TypeScript types don't survive at runtime, so the
 * SDK needs the string explicitly.
 *
 * Chain `.for(...).expand(...)` calls to expand multiple types in one request.
 *
 * @example
 * ```ts
 * import { Expander } from "aprimo-js";
 * import type { Record, File, FileVersion } from "aprimo-js/model";
 *
 * const expander = Expander.create()
 *   .for<Record>("Record").expand("masterfile", "fields")
 *   .for<File>("File").expand("fileversions")
 *   .for<FileVersion>("FileVersion").expand("renditions");
 *
 * const res = await aprimo.records.getById(id, expander);
 * // → res.data._embedded.masterfile._embedded.fileversions...
 * ```
 */
export class Expander {
  private readonly map = new Map<string, Set<string>>();
  private readonly recordFields = new Set<string>();

  /**
   * Start a new expander. Equivalent to `new Expander()`.
   *
   * @example
   * ```ts
   * const expander = Expander.create();
   * ```
   */
  static create(): Expander {
    return new Expander();
  }

  /**
   * Begin a per-type expand chain.
   *
   * @typeParam T - The resource type whose `_embedded` field names are valid
   *   on the returned `expand(...)` call. Used only for compile-time validation.
   * @param modelName - The API-side type name used to construct the
   *   `select-<modelName>` header (e.g. `"Record"`, `"File"`, `"FileVersion"`,
   *   `"Classification"`). Must match the casing the API expects.
   * @returns An object with `expand(...fields)` — call it with one or more
   *   field names from `T["_embedded"]`. `expand` returns the `Expander` so
   *   you can chain another `.for(...)`.
   *
   * @example
   * ```ts
   * Expander.create()
   *   .for<Record>("Record").expand("masterfile", "fields");
   * ```
   */
  for<T extends { _embedded?: unknown }>(
    modelName: string,
  ): {
    expand: (...fields: (keyof NonNullable<T["_embedded"]>)[]) => Expander;
  } {
    return {
      expand: (...fields: (keyof NonNullable<T["_embedded"]>)[]) => {
        if (!this.map.has(modelName)) this.map.set(modelName, new Set());
        const set = this.map.get(modelName)!;
        fields.forEach((f) => set.add(f as string));
        return this;
      },
    };
  }

  /**
   * Restrict the field set returned when expanding a `Record`'s `fields`.
   * Maps to the `select-record-fields` header.
   *
   * @param fields - Field names (as configured on the tenant) to include in
   *   the expanded `fields` payload. Omit this method to receive all fields.
   *
   * @example
   * ```ts
   * Expander.create()
   *   .for<Record>("Record").expand("fields")
   *   .selectRecordFields("Title", "MyField");
   * ```
   */
  selectRecordFields(...fields: string[]): Expander {
    fields.forEach((f) => this.recordFields.add(f));
    return this;
  }

  /**
   * Internal: serialize the configured expansions into HTTP headers. The SDK
   * calls this for you — consumers normally don't need to.
   */
  getHeaders(): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [type, fields] of this.map.entries()) {
      result[`select-${type}`] = [...fields].join(",");
    }
    if (this.recordFields.size > 0) {
      result["select-record-fields"] = [...this.recordFields].join(",");
    }
    return result;
  }
}
