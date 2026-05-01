import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const recordId = process.env.TEST_RECORD_ID!;

describe("collections integration", () => {
  let staticId: string;
  let dynamicId: string;
  let dynamicSubId: string;

  it("creates a static collection", async () => {
    const res = await aprimo.collections.createStatic({
      name: `IntegrationStatic_${Date.now()}`,
      description: "Integration test static collection",
    });
    expectOk(res);
    expect(res.data?.id).toBeDefined();
    staticId = res.data!.id;
  });

  it("creates a dynamic collection", async () => {
    const res = await aprimo.collections.createDynamic({
      name: `IntegrationDynamic_${Date.now()}`,
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
      name: `IntegrationDynamicSub_${Date.now()}`,
      searchExpression: {
        expression: "*",
        languages: [],
      },
      subExpressions: [
        { expression: "*", languages: [] },
      ],
    });
    expectOk(res);
    expect(res.data?.id).toBeDefined();
    dynamicSubId = res.data!.id;
  });

  it("gets a list of collections", async () => {
    const res = await aprimo.collections.get({ pageSize: 5 });
    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches collections paged", async () => {
    let count = 0;
    for await (const page of aprimo.collections.getPaged({ pageSize: 2 })) {
      expectOk(page);
      count += page.data?.items?.length ?? 0;
      if (count >= 4) break;
    }
    expect(count).toBeGreaterThan(0);
  });

  it("gets the static collection by id", async () => {
    const res = await aprimo.collections.getById(staticId);
    expectOk(res);
    expect(res.data?.id).toBe(staticId);
  });

  it("updates records on the static collection", async () => {
    const res = await aprimo.collections.updateRecords(staticId, {
      records: { addOrUpdate: [recordId] },
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

  it("deletes the dynamic-with-sub-expressions collection", async () => {
    const res = await aprimo.collections.delete(dynamicSubId);
    expectOk(res);
  });
});
