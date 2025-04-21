import { describe, it } from "vitest";
import { createClient } from "../../../src";
import { expectOk } from "../../utils";
import { Expander } from "../../../src/expander";
import { Record } from "../../../src/model/Record";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("files integration", () => {
  let fileId: string;

  it("checks out a file", async () => {
    const expander = Expander.create().for<Record>("Record").expand("files");

    const recordRes = await aprimo.records.getById(
      process.env.TEST_RECORD_ID!,
      expander,
    );

    const file = recordRes.data?._embedded?.files?.items?.[0];

    if (!file) {
      throw new Error("File not found");
    }

    fileId = file.id;

    const res = await aprimo.files.checkOut(fileId);
    expectOk(res);
  });

  it("checks in a file", async () => {
    const res = await aprimo.files.checkIn(fileId);
    expectOk(res);
  });
});
