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

describe("productivity digitalAssets integration", () => {
  let assetId: number;

  it("creates a digital asset", async () => {
    const ownerId = await getCurrentUserId(aprimo);
    const res = await aprimo.productivity.digitalAssets.create({
      title: `int-test-asset-${Date.now()}`,
      ownerId,
      type: 1,
      assetStatus: 1,
      restrictionStatus: 1,
      visibleInPortal: 1,
      isReferenceDocument: false,
      customThumbnail: 0,
      allowOnDemand: 0,
      promotedFromActivity: false,
      canDownload: true,
      hasVersions: true,
    });
    expectOk(res);
    logShape("digitalAssets.create", res.data);
    expect(res.data?.assetId).toBeDefined();
    assetId = res.data!.assetId!;
  });

  it("gets the digital asset by id", async () => {
    const res = await aprimo.productivity.digitalAssets.getById(assetId);
    expectOk(res);
    logShape("digitalAssets.getById", res.data);
    expect(res.data?.assetId).toBeDefined();
  });

  it("updates the digital asset", async () => {
    const res = await aprimo.productivity.digitalAssets.update(assetId, {
      title: `int-test-asset-updated-${Date.now()}`,
    });
    expectOk(res);
  });

  it("deletes the digital asset", async () => {
    const res = await aprimo.productivity.digitalAssets.delete(assetId);
    expectOk(res);
  });
});
