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

describe("productivity digitalAssetRenditions integration", () => {
  let versionId: number;
  let renditionId: number;

  beforeAll(async () => {
    const versions =
      await aprimo.productivity.digitalAssetVersions.getByAssetId(assetId, {
        limit: 1,
      });
    versionId = pickFirstId<number>(versions, "versionId")!;
  });

  it("gets renditions for a version", async () => {
    const res = await aprimo.productivity.digitalAssetRenditions.getByVersionId(
      assetId,
      versionId,
    );
    expectOk(res);
    logShape("digitalAssetRenditions.getByVersionId", res.data);
  });

  it("creates a rendition", async () => {
    const blob = new Blob([new Uint8Array(1024).fill(1)], {
      type: "application/octet-stream",
    });
    const file = new File([blob], "integration-rendition.bin", {
      type: "application/octet-stream",
    });
    const upload = await aprimo.productivity.uploader.uploadFile(file);
    expectOk(upload);
    const res = await aprimo.productivity.digitalAssetRenditions.create(
      assetId,
      versionId,
      {
        title: `int-test-rendition-${Date.now()}`,
        versionId,
        FileId: upload.data!.FileId!,
        FileName: "integration-rendition.bin",
      },
    );
    expectOk(res);
    logShape("digitalAssetRenditions.create", res.data);
    renditionId = res.data!.renditionId!;
  });

  it("gets a rendition by id", async () => {
    const res = await aprimo.productivity.digitalAssetRenditions.getById(
      assetId,
      versionId,
      renditionId,
    );
    expectOk(res);
    logShape("digitalAssetRenditions.getById", res.data);
    expect(res.data?.renditionId).toBeDefined();
  });
});
