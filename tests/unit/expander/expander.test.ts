import { Expander } from "../../../src/expander";
import { describe, it, expect } from "vitest";
import { Record } from "../../../src/model";

interface Dummy {
  _embedded?: {
    foo?: unknown;
    bar?: unknown;
  };
}

interface Other {
  _embedded?: {
    baz?: unknown;
  };
}

describe("Expander", () => {
  it("creates an instance", () => {
    const expander = Expander.create();
    expect(expander).toBeInstanceOf(Expander);
  });

  it("adds fields to a model and returns correct headers", () => {
    const expander = Expander.create().for<Dummy>("Dummy").expand("foo", "bar");

    const headers = expander.getHeaders();
    expect(headers).toEqual({
      "select-Dummy": "foo,bar",
    });
  });

  it("adds multiple models with different fields", () => {
    const expander = Expander.create()
      .for<Dummy>("Dummy")
      .expand("foo")
      .for<Other>("Other")
      .expand("baz");

    const headers = expander.getHeaders();
    expect(headers).toEqual({
      "select-Dummy": "foo",
      "select-Other": "baz",
    });
  });

  it("merges fields if expand is called multiple times", () => {
    const expander = Expander.create()
      .for<Dummy>("Dummy")
      .expand("foo")
      .for<Dummy>("Dummy")
      .expand("bar");

    const headers = expander.getHeaders();
    expect(headers).toEqual({
      "select-Dummy": expect.stringContaining("foo"),
    });
    expect(headers["select-Dummy"]).toContain("bar");
  });

  it("adds record field selection", () => {
    const expander = Expander.create()
      .for<Record>("Record")
      .expand("fields")
      .selectRecordFields("Title", "MyField");

    const headers = expander.getHeaders();
    expect(headers).toEqual({
      "select-Record": "fields",
      "select-record-fields": "Title,MyField",
    });
  });

  it("returns empty headers if nothing added", () => {
    const expander = Expander.create();
    expect(expander.getHeaders()).toEqual({});
  });
});
