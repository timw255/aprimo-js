import { describe, it, expect, beforeAll } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { logShape, pickFirstId } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const assetId = Number(process.env.APRIMO_PM_DIGITAL_ASSET_ID);

describe("productivity digitalAssetVersions integration", () => {
  let versionId: number;

  beforeAll(async () => {
    const versions =
      await aprimo.productivity.digitalAssetVersions.getByAssetId(assetId, {
        limit: 1,
      });
    versionId = pickFirstId<number>(versions, "versionId")!;
  });

  it("gets versions for an asset", async () => {
    const res =
      await aprimo.productivity.digitalAssetVersions.getByAssetId(assetId);
    expectOk(res);
    logShape("digitalAssetVersions.getByAssetId", res.data);
  });

  it("gets a version by id", async () => {
    const res = await aprimo.productivity.digitalAssetVersions.getById(
      assetId,
      versionId,
    );
    expectOk(res);
    logShape("digitalAssetVersions.getById", res.data);
    expect(res.data?.versionId).toBeDefined();
  });

  it("gets version comments", async () => {
    const res = await aprimo.productivity.digitalAssetVersions.getComments(
      assetId,
      versionId,
    );
    expectOk(res);
    logShape("digitalAssetVersions.getComments", res.data);
  });

  it("gets version tags", async () => {
    const res = await aprimo.productivity.digitalAssetVersions.getTags(
      assetId,
      versionId,
    );
    expectOk(res);
    logShape("digitalAssetVersions.getTags", res.data);
  });
});
