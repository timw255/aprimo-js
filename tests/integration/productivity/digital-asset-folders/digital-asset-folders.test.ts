import { describe, it } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const assetId = Number(process.env.APRIMO_PM_DIGITAL_ASSET_ID);

describe("productivity digitalAssetFolders integration", () => {
  it("gets folders for an asset", async () => {
    const res = await aprimo.productivity.digitalAssetFolders.getByAssetId(assetId);
    expectOk(res);
    logShape("digitalAssetFolders.getByAssetId", res.data);
  });
});
