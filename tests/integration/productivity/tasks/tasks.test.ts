import { beforeAll, describe, it, expect } from "vitest";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";
import { logShape } from "../_helpers";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const attachmentId = Number(process.env.APRIMO_PM_ATTACHMENT_ID);

/**
 * Fixtures are discovered at run time; the `APRIMO_PM_*` vars are overrides.
 *
 * Tenant setup: the integration user needs a PM user role, membership of the
 * project's activity team, and at least one task assigned to it.
 */
let taskId: number;
let documentId: string;
let versionId: string;

/** Names the missing fixture when one isn't available. */
const required = (value: string | number | undefined, what: string) => {
  expect(
    value,
    `no ${what} available — assign one to the integration user, or set the ` +
      `matching APRIMO_PM_* override`,
  ).toBeTruthy();
  return value!;
};

const firstId = (data: unknown): string | undefined => {
  const o = (data ?? {}) as Record<string, unknown>;
  for (const k of Object.keys(o)) {
    if (k === "_links" || !Array.isArray(o[k])) continue;
    const first = (o[k] as Record<string, unknown>[])[0];
    if (!first) continue;
    const href = typeof first.href === "string" ? first.href.split("/").pop() : undefined;
    const id = first.documentId ?? first.versionId ?? first.taskId ?? href;
    if (id !== undefined) return String(id);
  }
  return undefined;
};

beforeAll(async () => {
  const envTask = Number(process.env.APRIMO_PM_TASK_ID);
  const assigned = await aprimo.productivity.tasks.get({ limit: 50 });
  taskId = Number.isFinite(envTask) && envTask > 0
    ? envTask
    : Number(firstId(assigned.data));

  const uploads = await aprimo.productivity.tasks.getDocumentUploads(taskId);
  documentId = process.env.APRIMO_PM_TASK_DOCUMENT_ID || (firstId(uploads.data) ?? "");

  if (documentId) {
    const versions = await aprimo.productivity.tasks.getDocumentVersions(taskId, documentId);
    versionId = process.env.APRIMO_PM_TASK_DOCUMENT_VERSION_ID || (firstId(versions.data) ?? "");
  } else {
    versionId = process.env.APRIMO_PM_TASK_DOCUMENT_VERSION_ID || "";
  }
});

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
    required(documentId, "task document-upload");
    const res = await aprimo.productivity.tasks.getDocumentVersions(
      taskId,
      documentId,
    );
    expectOk(res);
    logShape("tasks.getDocumentVersions", res.data);
  });

  it("gets a specific version of a task document upload", async () => {
    required(versionId, "task document version");
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
    required(documentId, "task document-upload");
    const res = await aprimo.productivity.tasks.uploadDocumentAttachment(
      taskId,
      documentId,
      {},
    );
    expectOk(res);
  });

  it("uploads a document attachment version", async () => {
    required(documentId, "task document-upload");
    const res = await aprimo.productivity.tasks.uploadDocumentAttachmentVersion(
      taskId,
      documentId,
      attachmentId,
      {},
    );
    expectOk(res);
  });

  it("deletes an uploaded version", async () => {
    required(versionId, "task document version");
    const res = await aprimo.productivity.tasks.deleteUploadedVersion(
      taskId,
      documentId,
      versionId,
    );
    expectOk(res);
  });
});
