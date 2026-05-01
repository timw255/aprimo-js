import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk } from "../../utils";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

const additionalFileId = process.env.APRIMO_DAM_ADDITIONAL_FILE_ID!;

describe("additionalFiles integration", () => {
  it("gets an additional file by id", async () => {
    const res = await aprimo.additionalFiles.getById(additionalFileId);
    expectOk(res);
    expect(res.data?.id).toBeDefined();
  });
});
