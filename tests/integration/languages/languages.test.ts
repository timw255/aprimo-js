import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("languages integration", () => {
  let languageId: string;

  it("creates a test language", async () => {
    const res = await aprimo.languages.create({
      name: "Test Language",
      culture: "zz-ZZ",
      isEnabledForFields: false,
      isEnabledForUI: false,
    });
    expectOk(res);
    expect(res.data?.id).toBeDefined();
    languageId = res.data!.id;
  });

  it("reads the created language", async () => {
    const res = await aprimo.languages.getById(languageId);
    expectOk(res);
    expect(res.data?.id).toBe(languageId);
  });

  it("updates the test language", async () => {
    const res = await aprimo.languages.update(languageId, {
      isEnabledForFields: true,
    });
    expectOk(res);
    expect(res.status).toBe(204);
  });

  it("deletes the test language", async () => {
    const res = await aprimo.languages.delete(languageId);
    expectOk(res);
    expect(res.status).toBe(204);
  });
});
