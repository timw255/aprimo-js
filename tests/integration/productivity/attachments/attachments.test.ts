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

const activityId = Number(process.env.APRIMO_PM_ACTIVITY_ID);
const projectId = Number(process.env.APRIMO_PM_PROJECT_ID);
const activityObjectTypeId = 1;

describe("productivity attachments integration", () => {
  let attachmentId: number;

  it("creates an attachment", async () => {
    const creatorId = await getCurrentUserId(aprimo);
    const res = await aprimo.productivity.attachments.create({
      title: `int-test-attachment-${Date.now()}`,
      objectId: activityId,
      objectTypeId: activityObjectTypeId,
      creatorId,
    });
    expectOk(res);
    logShape("attachments.create", res.data);
    expect(res.data?.attachmentId).toBeDefined();
    attachmentId = res.data!.attachmentId!;
  });

  it("searches attachments", async () => {
    const res = await aprimo.productivity.attachments.search(
      { equals: { fieldName: "attachmentTypeId", fieldValue: 1 } },
      { limit: 5 },
    );
    expectOk(res);
    logShape("attachments.search", res.data);
  });

  it("gets an attachment by id", async () => {
    const res = await aprimo.productivity.attachments.getById(attachmentId);
    expectOk(res);
    logShape("attachments.getById", res.data);
    expect(res.data?.attachmentId).toBeDefined();
  });

  it("gets the attachment's parent activity", async () => {
    const res = await aprimo.productivity.attachments.getActivity(attachmentId);
    expectOk(res);
    logShape("attachments.getActivity", res.data);
  });

  it("gets review-required documents for the attachment", async () => {
    const res =
      await aprimo.productivity.attachments.getReviewRequiredDocuments(
        attachmentId,
      );
    expectOk(res);
    logShape("attachments.getReviewRequiredDocuments", res.data);
  });

  it("gets attachments for a project", async () => {
    const res = await aprimo.productivity.attachments.getByProjectId(projectId);
    expectOk(res);
    logShape("attachments.getByProjectId", res.data);
  });

  it("updates the test attachment", async () => {
    const res = await aprimo.productivity.attachments.update(attachmentId, {
      title: `int-test-attachment-updated-${Date.now()}`,
    });
    expectOk(res);
  });

  it("checks out the attachment", async () => {
    const res = await aprimo.productivity.attachments.checkout(attachmentId);
    expectOk(res);
  });

  it("cancels the checkout", async () => {
    const res = await aprimo.productivity.attachments.cancelCheckout(attachmentId);
    expectOk(res);
  });

  it("deletes the test attachment", async () => {
    const res = await aprimo.productivity.attachments.delete(attachmentId);
    expectOk(res);
  });
});
