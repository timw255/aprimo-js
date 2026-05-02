import { describe, it, expect } from "vitest";
import { randomUUID } from "node:crypto";
import { createClient } from "../../../../src";
import { expectOk } from "../../../utils";

function createMockFile(name: string, size: number): File {
  const blob = new Blob([new Uint8Array(size).fill(1)], {
    type: "application/octet-stream",
  });
  return new File([blob], name, { type: "application/octet-stream" });
}

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("productivity uploader integration", () => {
  it("uploads a small file via chunk endpoints", async () => {
    const file = createMockFile("pm-uploader-small.txt", 1 * 1024 * 1024);
    const res = await aprimo.productivity.uploader.uploadFile(file);
    expectOk(res);
    expect(res.data?.FileId).toBeTruthy();
  });

  it("uploads a multi-chunk file with progress", async () => {
    const file = createMockFile("pm-uploader-multi.txt", 25 * 1024 * 1024);
    let lastSeen = 0;
    const res = await aprimo.productivity.uploader.uploadFile(file, {
      chunkSize: 8 * 1024 * 1024,
      onProgress: (uploaded) => {
        lastSeen = uploaded;
      },
    });
    expectOk(res);
    expect(lastSeen).toBeGreaterThan(0);
  });

  it("uploads a small file via the attachment chunk routes", async () => {
    const file = createMockFile("pm-uploader-attachment.txt", 1 * 1024 * 1024);
    const res = await aprimo.productivity.uploader.uploadFile(file, {
      attachment: true,
    });
    expectOk(res);
    expect(res.data?.FileId).toBeTruthy();
  });

  it("exercises the low-level chunk primitives", async () => {
    const identifier = randomUUID();
    const file = createMockFile("pm-uploader-low.txt", 1024);
    const blob = file.slice(0, file.size);
    const params = {
      resumableFilename: file.name,
      resumableChunkNumber: 1,
      resumableIdentifier: identifier,
    };

    await aprimo.productivity.uploader.checkChunk(params);

    const uploadRes = await aprimo.productivity.uploader.uploadChunk(blob, params);
    expectOk(uploadRes);

    const completeRes = await aprimo.productivity.uploader.complete({
      FileId: identifier,
      FileName: file.name,
    });
    expectOk(completeRes);
  });
});
