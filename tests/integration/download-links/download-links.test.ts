import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("downloadLinks integration", () => {
  let downloadLinkId: string;

  it("fetches a list of download links", async () => {
    const res = await aprimo.downloadLinks.get({ pageSize: 5 });
    expectOk(res);

    const items = res.data?.items ?? [];
    expect(items.length).toBeGreaterThan(0);
    downloadLinkId = items[0].id!;
  });

  it("fetches a download link by ID", async () => {
    if (!downloadLinkId) {
      throw new Error("No download link ID from previous test.");
    }

    const res = await aprimo.downloadLinks.getById(downloadLinkId);
    expectOk(res);
    expect(res.data?.id).toBe(downloadLinkId);
  });
});
