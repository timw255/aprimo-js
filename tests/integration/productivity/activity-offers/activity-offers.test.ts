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
const offerId = Number(process.env.APRIMO_PM_OFFER_ID);

describe("productivity activityOffers integration", () => {
  let activityOfferId: number;

  it("lists offers for an activity", async () => {
    const res = await aprimo.productivity.activityOffers.getByActivityId(activityId);
    expectOk(res);
    logShape("activityOffers.getByActivityId", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("creates an activity-offer link", async () => {
    const res = await aprimo.productivity.activityOffers.create({
      activityId,
      offerId,
    });
    expectOk(res);
    logShape("activityOffers.create", res.data);
    expect(res.data?.activityOfferId).toBeDefined();
    activityOfferId = res.data!.activityOfferId!;
  });

  it("gets the activity-offer by id", async () => {
    const res = await aprimo.productivity.activityOffers.getById(activityOfferId);
    expectOk(res);
    logShape("activityOffers.getById", res.data);
    expect(res.data?.activityOfferId).toBe(activityOfferId);
  });

  it("updates the activity-offer", async () => {
    const res = await aprimo.productivity.activityOffers.update(activityOfferId, {
      activityOfferId,
      offerId,
      activityId,
      revenuePerOffer: 10,
    });
    expectOk(res);
  });

  it("deletes the activity-offer", async () => {
    const res = await aprimo.productivity.activityOffers.delete(activityOfferId);
    expectOk(res);
  });
});
