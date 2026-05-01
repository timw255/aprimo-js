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

describe("productivity offers integration", () => {
  let offerId: number;

  it("creates an offer", async () => {
    const userId = await getCurrentUserId(aprimo);
    const now = new Date().toISOString();
    const res = await aprimo.productivity.offers.create({
      title: `int-test-offer-${Date.now()}`,
      beginDate: now,
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      statusId: 1,
      ownerId: userId,
      modifiedUser: userId,
    });
    expectOk(res);
    logShape("offers.create", res.data);
    expect(res.data?.offerId).toBeDefined();
    offerId = res.data!.offerId!;
  });

  it("gets offers", async () => {
    const res = await aprimo.productivity.offers.get({ limit: 5 });
    expectOk(res);
    logShape("offers.get", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets an offer by id", async () => {
    const res = await aprimo.productivity.offers.getById(offerId);
    expectOk(res);
    logShape("offers.getById", res.data);
    expect(res.data?.offerId).toBe(offerId);
  });

  it("updates the offer", async () => {
    const current = await aprimo.productivity.offers.getById(offerId);
    expectOk(current);
    const res = await aprimo.productivity.offers.update(offerId, {
      ...(current.data as unknown as Record<string, unknown>),
      offerId,
      title: `int-test-offer-updated-${Date.now()}`,
    });
    expectOk(res);
  });

});
