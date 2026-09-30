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

  it("lists the renditions of a file version", async () => {
    const res = await aprimo.fileVersions.getRenditions(fileVersionId);
    expectOk(res);
    logShape("fileVersions.getRenditions", res.data);
    expect(Array.isArray(res.data?.items)).toBe(true);
  });

  it("lists the public uris of a file version", async () => {
    const res = await aprimo.fileVersions.getPublicUris(fileVersionId);
    expectOk(res);
    logShape("fileVersions.getPublicUris", res.data);
    expect(Array.isArray(res.data?.items)).toBe(true);
  });

  it("lists the public links of a file version", async () => {
    const res = await aprimo.fileVersions.getPublicLinks(fileVersionId);
    expectOk(res);
    logShape("fileVersions.getPublicLinks", res.data);
    expect(Array.isArray(res.data?.items)).toBe(true);
  });

  it("gets a rendition by id", async () => {
    const list = await aprimo.fileVersions.getRenditions(fileVersionId);
    expectOk(list);
    const renditionId = list.data?.items?.[0]?.id;
    expect(renditionId).toBeDefined();

    const res = await aprimo.renditions.getById(renditionId!);
    expectOk(res);
    logShape("renditions.getById", res.data);
    expect(res.data?.id).toBe(renditionId);
  });

  it("gets a public uri by id", async () => {
    const list = await aprimo.fileVersions.getPublicUris(fileVersionId);
    expectOk(list);
    const publicUriId = list.data?.items?.[0]?.id;
    expect(publicUriId).toBeDefined();

    const res = await aprimo.publicUris.getById(publicUriId!);
    expectOk(res);
    logShape("publicUris.getById", res.data);
    expect(res.data?.id).toBe(publicUriId);
  });
});
