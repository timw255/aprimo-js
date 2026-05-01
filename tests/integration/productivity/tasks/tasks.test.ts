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

const taskId = Number(process.env.APRIMO_PM_TASK_ID);
const documentId = process.env.APRIMO_PM_TASK_DOCUMENT_ID!;
const versionId = process.env.APRIMO_PM_TASK_DOCUMENT_VERSION_ID!;
const attachmentId = Number(process.env.APRIMO_PM_ATTACHMENT_ID);

describe("productivity tasks integration", () => {
  it("gets tasks", async () => {
    const res = await aprimo.productivity.tasks.get({ limit: 5 });
    expectOk(res);
    logShape("tasks.get", res.data);
    expect(res.data?._total).toBeDefined();
  });

  it("gets my tasks", async () => {
    const res = await aprimo.productivity.tasks.getMine(8, { limit: 5 });
    expectOk(res);
    logShape("tasks.getMine", res.data);
  });

  it("gets a task by id", async () => {
    const res = await aprimo.productivity.tasks.getById(taskId);
    expectOk(res);
    logShape("tasks.getById", res.data);
    expect(res.data?.taskId).toBe(taskId);
  });

  it("gets task documents", async () => {
    const res = await aprimo.productivity.tasks.getDocuments(taskId);
    expectOk(res);
    logShape("tasks.getDocuments", res.data);
  });

  it("gets task document attachments", async () => {
    const res = await aprimo.productivity.tasks.getDocumentAttachments(taskId);
    expectOk(res);
    logShape("tasks.getDocumentAttachments", res.data);
  });

  it("gets task document assets", async () => {
    const res = await aprimo.productivity.tasks.getDocumentAssets(taskId);
    expectOk(res);
    logShape("tasks.getDocumentAssets", res.data);
  });

  it("gets task document uploads", async () => {
    const res = await aprimo.productivity.tasks.getDocumentUploads(taskId);
    expectOk(res);
    logShape("tasks.getDocumentUploads", res.data);
  });

  it("gets a specific task document upload", async () => {
    const res = await aprimo.productivity.tasks.getDocumentUpload(
      taskId,
      documentId,
    );
    expectOk(res);
    logShape("tasks.getDocumentUpload", res.data);
  });

  it("gets versions of a task document upload", async () => {
    const res = await aprimo.productivity.tasks.getDocumentVersions(
      taskId,
      documentId,
    );
    expectOk(res);
    logShape("tasks.getDocumentVersions", res.data);
  });

  it("gets a specific version of a task document upload", async () => {
    const res = await aprimo.productivity.tasks.getDocumentVersion(
      taskId,
      documentId,
      versionId,
    );
    expectOk(res);
    logShape("tasks.getDocumentVersion", res.data);
  });

  it("gets task working digital assets", async () => {
    const res = await aprimo.productivity.tasks.getWorkingDigitalAssets(taskId);
    expectOk(res);
    logShape("tasks.getWorkingDigitalAssets", res.data);
  });

  it("gets a specific task working digital asset", async () => {
    const res = await aprimo.productivity.tasks.getWorkingDigitalAsset(
      taskId,
      documentId,
    );
    expectOk(res);
    logShape("tasks.getWorkingDigitalAsset", res.data);
  });

  it("gets task working attachments", async () => {
    const res = await aprimo.productivity.tasks.getWorkingAttachments(taskId);
    expectOk(res);
    logShape("tasks.getWorkingAttachments", res.data);
  });

  it("gets a specific task working attachment", async () => {
    const res = await aprimo.productivity.tasks.getWorkingAttachment(
      taskId,
      documentId,
    );
    expectOk(res);
    logShape("tasks.getWorkingAttachment", res.data);
  });

  it("gets task document votes", async () => {
    const res = await aprimo.productivity.tasks.getDocumentVotes(taskId);
    expectOk(res);
    logShape("tasks.getDocumentVotes", res.data);
  });

  it("gets task review materials", async () => {
    const res = await aprimo.productivity.tasks.getReviewMaterials(taskId);
    expectOk(res);
    logShape("tasks.getReviewMaterials", res.data);
  });

  it("gets task assignees", async () => {
    const res = await aprimo.productivity.tasks.getAssignees(taskId);
    expectOk(res);
    logShape("tasks.getAssignees", res.data);
  });

  it("searches tasks", async () => {
    const res = await aprimo.productivity.tasks.search(
      { equals: { fieldName: "workFlowTaskStatus", fieldValue: 4 } },
      { limit: 5 },
    );
    expectOk(res);
    logShape("tasks.search", res.data);
  });

  it("uploads a document attachment to a task", async () => {
    const res = await aprimo.productivity.tasks.uploadDocumentAttachment(
      taskId,
      documentId,
      {},
    );
    expectOk(res);
  });

  it("uploads a document attachment version", async () => {
    const res = await aprimo.productivity.tasks.uploadDocumentAttachmentVersion(
      taskId,
      documentId,
      attachmentId,
      {},
    );
    expectOk(res);
  });

  it("deletes an uploaded version", async () => {
    const res = await aprimo.productivity.tasks.deleteUploadedVersion(
      taskId,
      documentId,
      versionId,
    );
    expectOk(res);
  });
});
