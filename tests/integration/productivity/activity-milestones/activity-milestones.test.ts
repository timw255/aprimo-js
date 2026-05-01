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

const activityId = Number(process.env.APRIMO_PM_ACTIVITY_ID);

describe("productivity activityMilestones integration", () => {
  it("creates a milestone for the test activity", async () => {
    const now = new Date().toISOString();
    const res = await aprimo.productivity.activityMilestones.create(activityId, {
      title: `int-test-milestone-${Date.now()}`,
      description: "Integration test fixture",
      startDate: now,
      endDate: now,
      activityId,
    });
    expectOk(res);
    logShape("activityMilestones.create", res.data);
    expect(res.data?.activityDateId).toBeDefined();
    expect(res.data?.activityId).toBeDefined();
  });
});
