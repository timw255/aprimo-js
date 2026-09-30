import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk, logShape } from "../../utils";
import { Expander } from "../../../src/expander";
import { Record } from "../../../src/model/Record";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("files integration", () => {
  let recordId: string;
  let fileId: string;

  it("checks out a file", async () => {
    recordId = process.env.TEST_RECORD_ID!;

    const expander = Expander.create().for<Record>("Record").expand("files");

    const recordRes = await aprimo.records.getById(recordId, expander);

    const file = recordRes.data?._embedded?.files?.items?.[0];

    if (!file) {
      throw new Error("File not found");
    }

    fileId = file.id;

    const res = await aprimo.files.checkOut(fileId);
    expectOk(res);
    logShape("files.checkOut", res.data);
  });

  it("checks in a file", async () => {
    const res = await aprimo.files.checkIn(fileId);
    expectOk(res);
    logShape("files.checkIn", res.data);
  });

  it("lists the versions of a file", async () => {
    const res = await aprimo.files.getVersions(fileId);
    expectOk(res);
    logShape("files.getVersions", res.data);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("gets the latest version of a file", async () => {
    const res = await aprimo.files.getLatestVersion(fileId);
    expectOk(res);
    logShape("files.getLatestVersion", res.data);
    expect(res.data?.id).toBeDefined();
    expect(res.data?.isLatest).toBe(true);
  });
});
