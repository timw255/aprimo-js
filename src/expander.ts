export class Expander {
  private readonly map = new Map<string, Set<string>>();

  static create(): Expander {
    return new Expander();
  }

  for<T extends { _embedded?: unknown }>(
    modelName: string,
  ): {
    expand: (...fields: (keyof NonNullable<T["_embedded"]>)[]) => Expander;
  } {
    return {
      expand: (...fields) => {
        if (!this.map.has(modelName)) this.map.set(modelName, new Set());
        const set = this.map.get(modelName)!;
        fields.forEach((f) => set.add(f as string));
        return this;
      },
    };
  }

  getHeaders(): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [type, fields] of this.map.entries()) {
      result[`select-${type}`] = [...fields].join(",");
    }
    return result;
  }
}
