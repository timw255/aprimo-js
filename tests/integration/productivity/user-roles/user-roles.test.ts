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

const projectId = Number(process.env.APRIMO_PM_PROJECT_ID);

describe("productivity userRoles integration", () => {
  let roleId: number;

  it("creates a user role", async () => {
    const defaults = await getTenantDefaults(aprimo);
    const res = await aprimo.productivity.userRoles.create({
      name: `int-test-role-${Date.now()}`,
      description: "Integration test fixture",
      activeFlag: 1,
      currencyCode: defaults.currencyCode,
      excludeFromChatboards: 0,
      usedInAnnotations: 0,
      color: "#888888",
    });
    expectOk(res);
    logShape("userRoles.create", res.data);
    expect(res.data?.roleId).toBeDefined();
    roleId = res.data!.roleId!;
  });

  it("gets user roles", async () => {
    const res = await aprimo.productivity.userRoles.get({ limit: 5 });
    expectOk(res);
    logShape("userRoles.get", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets the test user role by id", async () => {
    const res = await aprimo.productivity.userRoles.getById(roleId);
    expectOk(res);
    logShape("userRoles.getById", res.data);
    expect(res.data?.roleId).toBe(roleId);
  });

  it("updates the test user role", async () => {
    const res = await aprimo.productivity.userRoles.update(roleId, {
      description: "Updated by integration test",
    });
    expectOk(res);
  });

  it("gets annotation user roles", async () => {
    const res = await aprimo.productivity.userRoles.getAnnotationUserRoles();
    expectOk(res);
    logShape("userRoles.getAnnotationUserRoles", res.data);
  });

  it("gets project role memberships", async () => {
    const res =
      await aprimo.productivity.userRoles.getProjectRoleMemberships(projectId);
    expectOk(res);
    logShape("userRoles.getProjectRoleMemberships", res.data);
  });

  it("deletes the test user role", async () => {
    const res = await aprimo.productivity.userRoles.delete(roleId);
    expectOk(res);
  });
});
