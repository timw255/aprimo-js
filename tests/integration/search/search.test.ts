import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("search integration", () => {
  it("searches for records by expression", async () => {
    const res = await aprimo.search.records({
      searchExpression: {
        expression: "CreatedOn > 2000-01-01T00:00:00.000Z",
      },
    });

    expectOk(res);
    expect(res.data?.items.length).toBeGreaterThan(0);
    expect(res.data?.page).toBeDefined();
  });

  it("searches for classifications by expression", async () => {
    const res = await aprimo.search.classifications({
      searchExpression: {
        expression: "CreatedOn > 2000-01-01T00:00:00.000Z",
      },
    });

    expectOk(res);
    expect(res.data?.items.length).toBeGreaterThan(0);
    expect(res.data?.page).toBeDefined();
  });

  it("rebuilds the search index", async () => {
    await expect(aprimo.search.rebuildIndex()).resolves.toBeUndefined();
  });
});
