export class Expander {
  private readonly map = new Map<string, Set<string>>();
  private readonly recordFields = new Set<string>();

  static create(): Expander {
    return new Expander();
  }

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

  selectRecordFields(...fields: string[]): Expander {
    fields.forEach((f) => this.recordFields.add(f));
    return this;
  }

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
