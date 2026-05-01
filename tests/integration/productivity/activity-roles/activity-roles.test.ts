import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { getCurrentUserId, getTenantDefaults, logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const activityId = Number(process.env.APRIMO_PM_ACTIVITY_ID);

describe("productivity activityRoles integration", () => {
  let userRoleId: number;
  let activityRoleId: number;

  beforeAll(async () => {
    const defaults = await getTenantDefaults(aprimo);
    const role = await aprimo.productivity.userRoles.create({
      name: `int-test-activity-role-${Date.now()}`,
      description: "Integration test fixture",
      activeFlag: 1,
      currencyCode: defaults.currencyCode,
      excludeFromChatboards: 0,
      usedInAnnotations: 0,
      color: "#888888",
    });
    userRoleId = role.data!.roleId!;
  });

  afterAll(async () => {
    if (userRoleId) {
      await aprimo.productivity.userRoles.delete(userRoleId).catch(() => {});
    }
  });

  it("creates an activity role", async () => {
    const res = await aprimo.productivity.activityRoles.create(activityId, {
      userRoleId,
    });
    expectOk(res);
    logShape("activityRoles.create", res.data);
    expect(res.data?.activityRoleId).toBeDefined();
    activityRoleId = res.data!.activityRoleId!;
  });

  it("lists roles for the activity", async () => {
    const res = await aprimo.productivity.activityRoles.getByActivityId(activityId);
    expectOk(res);
    logShape("activityRoles.getByActivityId", res.data);
  });

  it("updates the activity role", async () => {
    const res = await aprimo.productivity.activityRoles.update(
      activityId,
      activityRoleId,
      { userRoleId },
    );
    expectOk(res);
  });

  it("adds members to the activity role", async () => {
    const userId = await getCurrentUserId(aprimo);
    const res = await aprimo.productivity.activityRoles.addMembers(
      activityId,
      activityRoleId,
      { users: [{ id: userId }] },
    );
    expectOk(res);
  });

  it("removes a member from the activity role", async () => {
    const userId = await getCurrentUserId(aprimo);
    const res = await aprimo.productivity.activityRoles.removeMember(
      activityId,
      activityRoleId,
      String(userId),
    );
    expectOk(res);
  });

  it("deletes the activity role", async () => {
    const res = await aprimo.productivity.activityRoles.delete(
      activityId,
      activityRoleId,
    );
    expectOk(res);
  });
});
