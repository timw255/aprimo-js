import { describe, it, expect, beforeAll } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { getCurrentUserId, logShape, pickFirstId } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const assetId = Number(process.env.APRIMO_PM_DIGITAL_ASSET_ID);

describe("productivity annotations integration", () => {
  let versionId: number;
  let annotationId: number;

  beforeAll(async () => {
    const versions =
      await aprimo.productivity.digitalAssetVersions.getByAssetId(assetId, {
        limit: 1,
      });
    versionId = pickFirstId<number>(versions, "versionId")!;
  });

  it("gets annotations for a version", async () => {
    const res = await aprimo.productivity.annotations.get(assetId, versionId, {
      offset: 0,
      limit: 100,
    });
    expectOk(res);
    logShape("annotations.get", res.data);
    expect(res.data).toBeDefined();
  });

  it("creates an annotation", async () => {
    const authorId = await getCurrentUserId(aprimo);
    const res = await aprimo.productivity.annotations.create(assetId, versionId, {
      type: "rectangle",
      page: 1,
      authorId,
      geometry: {
        boundingBox: { left: 0, bottom: 0, right: 100, top: 100 },
      },
      style: { color: "#ff0000", width: 2 },
      content: { comment: "integration test" },
    });
    expectOk(res);
    logShape("annotations.create", res.data);
    expect(res.data?.annotationId).toBeDefined();
    annotationId = res.data!.annotationId!;
  });

  it("deletes the annotation", async () => {
    const res = await aprimo.productivity.annotations.delete(
      assetId,
      versionId,
      annotationId,
    );
    expectOk(res);
  });
});
