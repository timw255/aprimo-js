import { describe, it, expect } from "vitest";
import { createClient } from "../../../src";
import { expectOk } from "../../utils";
import { Expander } from "../../../src/expander";
import { FileVersion } from "../../../src/model/FileVersion";
import { Record } from "../../../src/model/Record";
import { File } from "../../../src/model/File";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("public links integration", () => {
  let publicLinkId: string;

  it("should have real tests soon", () => {
    expect(true).toBe(true);
  });

  it("creates a public link", async () => {
    const expander = Expander.create()
      .for<Record>("Record")
      .expand("masterfile")
      .for<File>("File")
      .expand("fileversions")
      .for<FileVersion>("FileVersion")
      .expand("renditions");

    const recordRes = await aprimo.records.getById(
      process.env.TEST_RECORD_ID!,
      expander,
    );

    const rendition =
      recordRes.data?._embedded?.masterfile?._embedded?.fileversions
        ?.items?.[0];

    if (!rendition) {
      throw new Error("Original rendition not found");
    }

    const res = await aprimo.publicLinks.create({
      renditionName: "HD 720p",
      recordId: process.env.TEST_RECORD_ID!,
      uri: `https://p1.aprimocdn.net/${process.env.APRIMO_ENVIRONMENT!}/${process.env.TEST_RECORD_ID!}/${encodeURIComponent(process.env.TEST_RECORD_ID!)}${encodeURIComponent("_HD 720p")}.jpg`,
      provider: "FastlyCDN",
    });

    expectOk(res);
    expect(res.data?.id).toBeDefined();
    expect(res.data?.uri).toContain("https://p1.aprimocdn.net");

    publicLinkId = res.data!.id;
  });

  it("gets the public link by ID", async () => {
    const res = await aprimo.publicLinks.getById(publicLinkId);
    expectOk(res);
    expect(res.data?.id).toBe(publicLinkId);
  });

  it("updates the public link", async () => {
    const res = await aprimo.publicLinks.update(publicLinkId, {
      uri: `https://p1.aprimocdn.net/${process.env.APRIMO_ENVIRONMENT!}/${process.env.TEST_RECORD_ID!}/${encodeURIComponent(process.env.TEST_RECORD_ID!)}${encodeURIComponent("_HD 720p_updated")}.jpg`,
    });

    expectOk(res);
  });

  it("deletes the public link", async () => {
    const res = await aprimo.publicLinks.delete(publicLinkId);
    expectOk(res);
  });
});
