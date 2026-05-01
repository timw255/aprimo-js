import { describe, it, expect } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { getCurrentUserId, getTenantDefaults, logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("productivity activities integration", () => {
  let activityId: number;

  it("creates an activity", async () => {
    const [ownerId, defaults] = await Promise.all([
      getCurrentUserId(aprimo),
      getTenantDefaults(aprimo),
    ]);
    const now = new Date();
    const start = now.toISOString();
    const end = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const res = await aprimo.productivity.activities.create({
      name: `int-test-activity-${Date.now()}`,
      description: "Integration test fixture",
      activityTypeId: defaults.activityTypeId,
      activityStateId: defaults.activityStateId,
      ownerId,
      administratorId: ownerId,
      beginDate: start,
      endDate: end,
      visualEndDate: end,
      currencyCode: defaults.currencyCode,
      scsId: defaults.scsId,
      timeZoneId: defaults.timezoneId,
    });
    expectOk(res);
    logShape("activities.create", res.data);
    expect(res.data?.activityId).toBeDefined();
    activityId = res.data!.activityId;
  });

  it("creates a milestone for the activity", async () => {
    const now = new Date().toISOString();
    const res = await aprimo.productivity.activities.createMilestone(activityId, {
      title: `int-test-milestone-${Date.now()}`,
      description: "Integration test milestone",
      startDate: now,
      endDate: now,
      activityId,
    });
    expectOk(res);
    logShape("activities.createMilestone", res.data);
  });

  it("gets activities", async () => {
    const res = await aprimo.productivity.activities.get({ limit: 5 });
    expectOk(res);
    logShape("activities.get", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets the test activity by id", async () => {
    const res = await aprimo.productivity.activities.getById(activityId);
    expectOk(res);
    logShape("activities.getById", res.data);
    expect(res.data?.activityId).toBe(activityId);
  });

  it("updates the test activity", async () => {
    const res = await aprimo.productivity.activities.update(activityId, {
      description: "Updated by integration test",
    });
    expectOk(res);
  });

  it("searches activities", async () => {
    const res = await aprimo.productivity.activities.search(
      { equals: { fieldName: "activityTypeId", fieldValue: 1 } },
      { limit: 5 },
    );
    expectOk(res);
    logShape("activities.search", res.data);
  });

  it("deletes the test activity", async () => {
    const res = await aprimo.productivity.activities.delete(activityId);
    expectOk(res);
  });
});
