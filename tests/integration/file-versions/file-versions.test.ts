import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk, logShape } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const fileVersionId = process.env.APRIMO_DAM_FILE_VERSION_ID!;

describe("fileVersions integration", () => {
  it("gets a file version by id", async () => {
    const res = await aprimo.fileVersions.getById(fileVersionId);
    expectOk(res);
    logShape("fileVersions.getById", res.data);
    expect(res.data?.id).toBeDefined();
  });
});
