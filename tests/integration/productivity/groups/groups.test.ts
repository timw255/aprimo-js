import { describe, it, expect } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("productivity groups integration", () => {
  let groupId: number;

  it("creates a group", async () => {
    const res = await aprimo.productivity.groups.create({
      name: `int-test-group-${Date.now()}`,
      status: 1,
      financeGroup: 0,
      description: "Integration test fixture",
      domainRights: [{ domainId: 1, rights: [] }],
    });
    expectOk(res);
    logShape("groups.create", res.data);
    expect(res.data?.groupId).toBeDefined();
    groupId = res.data!.groupId!;
  });

  it("gets groups", async () => {
    const res = await aprimo.productivity.groups.get({ limit: 5 });
    expectOk(res);
    logShape("groups.get", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets the test group by id", async () => {
    const res = await aprimo.productivity.groups.getById(groupId);
    expectOk(res);
    logShape("groups.getById", res.data);
    expect(res.data?.groupId).toBe(groupId);
  });

  it("updates the test group", async () => {
    const res = await aprimo.productivity.groups.update(groupId, {
      description: "Updated by integration test",
    });
    expectOk(res);
  });

  it("searches groups", async () => {
    const res = await aprimo.productivity.groups.search({
      equals: { fieldName: "status", fieldValue: 1 },
    });
    expectOk(res);
    logShape("groups.search", res.data);
  });

  it("deletes the test group", async () => {
    const res = await aprimo.productivity.groups.delete(groupId);
    expectOk(res);
  });
});
