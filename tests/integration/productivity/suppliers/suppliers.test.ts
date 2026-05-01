import { describe, it, expect } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { getTenantDefaults, logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("productivity suppliers integration", () => {
  let supplierId: number;

  it("creates a supplier", async () => {
    const defaults = await getTenantDefaults(aprimo);
    const res = await aprimo.productivity.suppliers.create({
      name: `int-test-supplier-${Date.now()}`,
      preferred: 0,
      activeFlag: 1,
      supplierTypeId: defaults.supplierTypeId,
      notificationTypeId: defaults.notificationTypeId,
      description: "Integration test fixture",
    });
    expectOk(res);
    logShape("suppliers.create", res.data);
    expect(res.data?.supplierId).toBeDefined();
    supplierId = res.data!.supplierId;
  });

  it("gets suppliers", async () => {
    const res = await aprimo.productivity.suppliers.get({ limit: 5 });
    expectOk(res);
    logShape("suppliers.get", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets the test supplier by id", async () => {
    const res = await aprimo.productivity.suppliers.getById(supplierId);
    expectOk(res);
    logShape("suppliers.getById", res.data);
    expect(res.data?.supplierId).toBe(supplierId);
  });

  it("updates the test supplier", async () => {
    const res = await aprimo.productivity.suppliers.update(supplierId, {
      description: "Updated by integration test",
    });
    expectOk(res);
  });

  it("searches suppliers", async () => {
    const res = await aprimo.productivity.suppliers.search({
      equals: { fieldName: "preferred", fieldValue: 0 },
    });
    expectOk(res);
    logShape("suppliers.search", res.data);
  });

  it("deletes the test supplier", async () => {
    const res = await aprimo.productivity.suppliers.delete(supplierId);
    expectOk(res);
  });
});
