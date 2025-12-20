import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("collections integration", () => {
  let staticId: string;
  let dynamicId: string;
  let dynamicSubExpressionId: string;
  let testRecordId: string;

  it("creates a static collection", async () => {
    const res = await aprimo.collections.createStatic({
      name: `Static Collection ${Date.now()}`,
      description: "Created by integration test",
    });

    expectOk(res);
    expect(res.data?.id).toBeDefined();
    staticId = res.data!.id;
  });

  it("creates a dynamic collection", async () => {
    const res = await aprimo.collections.createDynamic({
      name: `Dynamic Collection ${Date.now()}`,
      searchExpression: {
        expression: "*",
        languages: [],
      },
    });

    expectOk(res);
    expect(res.data?.id).toBeDefined();
    dynamicId = res.data!.id;
  });

  it("creates a dynamic collection with sub-expressions", async () => {
    const res = await aprimo.collections.createDynamicWithSubExpressions({
      name: `Dynamic SubExpr Collection ${Date.now()}`,
      searchExpression: {
        expression: "*",
        languages: [],
      },
      subExpressions: [
        {
          expression: "*",
          languages: [],
        },
      ],
    });

    expectOk(res);
    expect(res.data?.id).toBeDefined();
    dynamicSubExpressionId = res.data!.id;
  });

  it("reads the static collection by id", async () => {
    const res = await aprimo.collections.getById(staticId);
    expectOk(res);
    expect(res.data?.id).toBe(staticId);
  });

  it("fetches collections", async () => {
    const res = await aprimo.collections.get({ pageSize: 5 });
    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged collections", async () => {
    let count = 0;

    for await (const page of aprimo.collections.getPaged({ pageSize: 2 })) {
      expectOk(page);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("adds the test record to the test static collection", async () => {
    testRecordId = process.env.TEST_RECORD_ID!;

    const res = await aprimo.collections.updateRecords(staticId, {
      records: {
        addOrUpdate: [testRecordId],
      },
    });

    expectOk(res);
  });

  it("removes the test record from the test static collection", async () => {
    const res = await aprimo.collections.updateRecords(staticId, {
      records: {
        remove: [testRecordId],
      },
    });

    expectOk(res);
  });

  it("deletes the static collection", async () => {
    const res = await aprimo.collections.delete(staticId);
    expectOk(res);
  });

  it("deletes the dynamic collection", async () => {
    const res = await aprimo.collections.delete(dynamicId);
    expectOk(res);
  });

  it("deletes the dynamic collection with sub-expressions", async () => {
    const res = await aprimo.collections.delete(dynamicSubExpressionId);
    expectOk(res);
  });
});
