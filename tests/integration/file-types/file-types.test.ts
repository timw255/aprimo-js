import { describe, it, expect } from "vitest";
import { expectOk, logShape } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("fileTypes integration", () => {
  let id: string;

  it("creates a file type", async () => {
    const res = await aprimo.fileTypes.create({
      allowOrderResizeSource: true,
      engineFormat: "ef",
      extension: "Jpg",
      isCatalogable: true,
      keepDocumentDimensions: true,
      kind: "Jpg",
      labels: [
        {
          languageId: "c2bd4f9b-bb95-4bcb-80c3-1e924c9c26dc",
          value: "jpgTutorial",
        },
      ],
      mimeType: "application/octet-stream",
      name: `Integration Type ${Date.now()}`,
      preferredExtension: false,
      previewFormat: "Jpg",
      previewRequired: true,
    });

    expectOk(res);
    logShape("fileTypes.create", res.data);
    expect(res.data?.id).toBeDefined();
    id = String(res.data!.id);
  });

  it("fetches the file type by ID", async () => {
    const res = await aprimo.fileTypes.getById(id);
    expectOk(res);
    logShape("fileTypes.getById", res.data);
    expect(res.data?.id).toBe(id);
  });

  it("updates the file type", async () => {
    const res = await aprimo.fileTypes.update(id, {
      catalogActions: {
        addOrUpdate: [
          {
            name: "ReadExif",
            isCritical: false,
          },
        ],
      },
    });

    expectOk(res);
    logShape("fileTypes.update", res.data);
  });

  it("fetches a list of file types", async () => {
    const res = await aprimo.fileTypes.get({ pageSize: 5 });
    expectOk(res);
    logShape("fileTypes.get", res.data);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged file types", async () => {
    let count = 0;

    for await (const page of aprimo.fileTypes.getPaged({ pageSize: 2 })) {
      expectOk(page);
      logShape("fileTypes.getPaged:page", page.data);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("deletes the file type", async () => {
    const res = await aprimo.fileTypes.delete(id);
    expectOk(res);
    logShape("fileTypes.delete", res.data);
  });
});
