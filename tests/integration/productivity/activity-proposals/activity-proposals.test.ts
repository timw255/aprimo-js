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

describe("productivity activityProposals integration", () => {
  let proposalId: number;

  it("gets proposal templates", async () => {
    const res = await aprimo.productivity.activityProposals.getTemplates({
      limit: 5,
    });
    expectOk(res);
    logShape("activityProposals.getTemplates", res.data);
  });

  it("creates an activity proposal", async () => {
    const [ownerId, defaults] = await Promise.all([
      getCurrentUserId(aprimo),
      getTenantDefaults(aprimo),
    ]);
    const now = new Date();
    const start = now.toISOString();
    const end = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const res = await aprimo.productivity.activityProposals.create({
      title: `int-test-proposal-${Date.now()}`,
      activityTypeId: defaults.activityTypeId,
      ownerId,
      administratorId: ownerId,
      beginDate: start,
      endDate: end,
      anchorDate: start,
      currencyCode: defaults.currencyCode,
      timeZone: defaults.timezoneId,
      proposalState: 1,
      classificationId: 1,
    });
    expectOk(res);
    logShape("activityProposals.create", res.data);
    expect(res.data?.proposalId).toBeDefined();
    proposalId = res.data!.proposalId!;
  });

  it("searches proposals", async () => {
    const res = await aprimo.productivity.activityProposals.search(
      { equals: { fieldName: "proposalState", fieldValue: 1 } },
      { limit: 5 },
    );
    expectOk(res);
    logShape("activityProposals.search", res.data);
  });

  it("gets a proposal by id", async () => {
    const res = await aprimo.productivity.activityProposals.getById(proposalId);
    expectOk(res);
    logShape("activityProposals.getById", res.data);
    expect(res.data?.proposalId).toBe(proposalId);
  });

  it("gets proposal forecasts", async () => {
    const res =
      await aprimo.productivity.activityProposals.getForecasts(proposalId);
    expectOk(res);
    logShape("activityProposals.getForecasts", res.data);
  });

  it("updates the test proposal", async () => {
    const res = await aprimo.productivity.activityProposals.update(proposalId, {
      title: `int-test-proposal-updated-${Date.now()}`,
    });
    expectOk(res);
  });
});
