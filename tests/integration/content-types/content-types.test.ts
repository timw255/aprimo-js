import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
import { TitleConfiguration } from "../../../src/model/TitleConfiguration";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("contentTypes integration", () => {
  let id: string;

  const titleConfig: TitleConfiguration = {
    option: "FileName",
    showExtension: true,
  };

  it("creates a content type", async () => {
    const res = await aprimo.contentTypes.create({
      name: `Integration Type ${Date.now()}`,
      titleConfiguration: titleConfig,
    });

    expectOk(res);
    expect(res.data?.id).toBeDefined();
    id = res.data!.id;
  });

  it("reads the content type by ID", async () => {
    const res = await aprimo.contentTypes.getById(id);
    expectOk(res);
    expect(res.data?.id).toBe(id);
  });

  it("updates the content type", async () => {
    const res = await aprimo.contentTypes.update(id, {
      purpose: "Testing",
    });

    expectOk(res);
  });

  it("fetches a list of content types", async () => {
    const res = await aprimo.contentTypes.get({ pageSize: 5 });
    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThan(0);
  });

  it("fetches paged content types", async () => {
    let count = 0;

    for await (const page of aprimo.contentTypes.getPaged({ pageSize: 2 })) {
      expectOk(page);
      count += page.data?.items?.length ?? 0;
      if (count >= 5) break;
    }

    expect(count).toBeGreaterThan(0);
  });

  it("deletes the content type", async () => {
    const res = await aprimo.contentTypes.delete(id);
    expectOk(res);
  });
});
