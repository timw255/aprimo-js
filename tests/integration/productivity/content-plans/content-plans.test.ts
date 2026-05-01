import { describe, it, expect } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { getCurrentUserId, logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const planId = Number(process.env.APRIMO_PM_CONTENT_PLAN_ID);
const activityId = Number(process.env.APRIMO_PM_ACTIVITY_ID);

describe("productivity contentPlans integration", () => {
  it("gets content plans", async () => {
    const res = await aprimo.productivity.contentPlans.get({ limit: 5 });
    expectOk(res);
    logShape("contentPlans.get", res.data);
    expect(res.data).toBeDefined();
  });

  it("gets a content plan by id", async () => {
    const res = await aprimo.productivity.contentPlans.getById(planId);
    expectOk(res);
    logShape("contentPlans.getById", res.data);
    expect(res.data?.planId).toBe(planId);
  });

  it("gets manage-activities for a plan", async () => {
    const res = await aprimo.productivity.contentPlans.getManageActivities(planId);
    expectOk(res);
    logShape("contentPlans.getManageActivities", res.data);
  });

  it("updates the content plan", async () => {
    const res = await aprimo.productivity.contentPlans.update(planId, {
      multipleValueExtendedAttributes: [],
    });
    expectOk(res);
  });

  it("adds activities to the content plan", async () => {
    const res = await aprimo.productivity.contentPlans.addActivities(planId, {
      activities: [activityId],
    });
    expectOk(res);
  });

  it("shares the content plan", async () => {
    const userId = await getCurrentUserId(aprimo);
    const res = await aprimo.productivity.contentPlans.share(planId, {
      AccessList: [{ objectId: planId, userId, hasEditRight: 0 }],
    });
    expectOk(res);
  });
});
