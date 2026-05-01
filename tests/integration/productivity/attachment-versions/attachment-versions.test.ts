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

const attachmentId = Number(process.env.APRIMO_PM_ATTACHMENT_ID);

describe("productivity attachmentVersions integration", () => {
  let versionId: number;

  beforeAll(async () => {
    const versions =
      await aprimo.productivity.attachmentVersions.getByAttachmentId(attachmentId, {
        limit: 1,
      });
    versionId = pickFirstId<number>(versions, "versionId")!;
  });

  it("gets versions for an attachment", async () => {
    const res =
      await aprimo.productivity.attachmentVersions.getByAttachmentId(attachmentId);
    expectOk(res);
    logShape("attachmentVersions.getByAttachmentId", res.data);
  });

  it("gets a version by id", async () => {
    const res = await aprimo.productivity.attachmentVersions.getById(
      attachmentId,
      versionId,
    );
    expectOk(res);
    logShape("attachmentVersions.getById", res.data);
    expect(res.data?.versionId).toBeDefined();
  });

  it("gets version comments", async () => {
    const res = await aprimo.productivity.attachmentVersions.getComments(
      attachmentId,
      versionId,
    );
    expectOk(res);
    logShape("attachmentVersions.getComments", res.data);
  });

  it("gets XFDF annotations for the version", async () => {
    const res = await aprimo.productivity.attachmentVersions.getXfdfAnnotations(
      attachmentId,
      versionId,
    );
    expectOk(res);
    logShape("attachmentVersions.getXfdfAnnotations", res.data);
  });
});
