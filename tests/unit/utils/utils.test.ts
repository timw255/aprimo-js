import { QueryParams } from "../../../src/model/QueryParams";
import {
  buildHeaders,
  computeSetActions,
  queryParamsToHeaders,
} from "../../../src/utils";
import { describe, it, expect } from "vitest";
import { Expander } from "../../../src/expander";
import { Record } from "../../../src/model";

describe("buildHeaders", () => {
  it("merges queryParams and expander headers", () => {
    const expander = Expander.create()
      .for<Record>("Record")
      .expand("fields", "files");

    const headers = buildHeaders({ page: 1, pageSize: 10 }, expander);

    expect(headers).toEqual(
      expect.objectContaining({
        page: "1",
        pageSize: "10",
        "select-Record": "fields,files",
      }),
    );
  });

  it("handles missing expander gracefully", () => {
    const headers = buildHeaders({ page: 2 });
    expect(headers).toEqual(expect.objectContaining({ page: "2" }));
  });
});

describe("queryParamsToHeaders", () => {
  it("correctly converts a full QueryParams object", () => {
    const input: QueryParams = {
      filter: 'status="active"',
      sort: "name",
      page: 2,
      pageSize: 50,
      skip: 10,
      take: 100,
    };

    const result = queryParamsToHeaders(input);
    expect(result).toEqual({
      filter: 'status="active"',
      sort: "name",
      page: "2",
      pageSize: "50",
      skip: "10",
      take: "100",
    });
  });

  it("ignores undefined and null values", () => {
    const input = { valid: "yes", skip: undefined, omit: null };
    const result = queryParamsToHeaders(input);
    expect(result).toEqual({ valid: "yes" });
  });

  it("returns an empty object if input is empty", () => {
    expect(queryParamsToHeaders()).toEqual({});
    expect(queryParamsToHeaders({})).toEqual({});
  });
});

describe("computeSetActions", () => {
  const item = (id: number, name: string) => ({ id, name });
  const key = (i: { id: number; name: string }) => String(i.id);

  it("returns undefined when no changes", () => {
    const a = [item(1, "a"), item(2, "b")];
    const result = computeSetActions(a, a, key);
    expect(result).toBeUndefined();
  });

  it("detects added items", () => {
    const prev = [item(1, "a")];
    const curr = [item(1, "a"), item(2, "b")];

    const result = computeSetActions(curr, prev, key);
    expect(result).toEqual({
      addOrUpdate: [item(2, "b")],
    });
  });

  it("detects updated items", () => {
    const prev = [item(1, "a")];
    const curr = [item(1, "z")];

    const result = computeSetActions(curr, prev, key);
    expect(result).toEqual({
      addOrUpdate: [item(1, "z")],
    });
  });

  it("detects removed items", () => {
    const prev = [item(1, "a"), item(2, "b")];
    const curr = [item(1, "a")];

    const result = computeSetActions(curr, prev, key);
    expect(result).toEqual({
      remove: [item(2, "b")],
    });
  });

  it("detects both added and removed items", () => {
    const prev = [item(1, "a")];
    const curr = [item(2, "b")];

    const result = computeSetActions(curr, prev, key);
    expect(result).toEqual({
      addOrUpdate: [item(2, "b")],
      remove: [item(1, "a")],
    });
  });

  it("uses default getKey if not provided", () => {
    const result = computeSetActions(["a", "b"], ["a", "c"]);
    expect(result).toEqual({
      addOrUpdate: ["b"],
      remove: ["c"],
    });
  });
});
