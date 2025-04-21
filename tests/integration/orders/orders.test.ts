import { describe, it, expect } from "vitest";
import { expectOk } from "../../utils";
import { createClient } from "../../../src";

const aprimo = createClient({
  environment: process.env.APRIMO_ENVIRONMENT!,
  type: "client_credentials",
  clientId: process.env.APRIMO_CLIENT_ID!,
  clientSecret: process.env.APRIMO_CLIENT_SECRET!,
});

describe("orders integration", () => {
  let orderId: string;

  it("creates a minimal download order", async () => {
    const res = await aprimo.orders.create({
      type: "download",
      disableNotification: true,
      disableProcessing: "yesIfPermissionGranted",
      targets: [
        {
          recordId: process.env.TEST_RECORD_ID!,
          targetTypes: ["Document"],
          assetType: "LatestVersionOfMasterFile",
          actions: [
            {
              action: "resizeImage",
              parameters: {
                width: 120,
                height: 110,
                format: "KeepOriginal",
                resolution: 300,
                colorSpace: "GrayScale",
                useAlphaTransparency: "true",
              },
            },
          ],
        },
      ],
    });

    expectOk(res);
    expect(res.data?.id).toBeTruthy();
    expect(res.data?.status).toMatch(/Success|Executing|Queued/i);

    orderId = res.data!.id;
  });

  it("fetches an order by ID", async () => {
    if (!orderId) throw new Error("Order was not created.");

    const res = await aprimo.orders.getById(orderId);

    expectOk(res);
    expect(res.data?.id).toBe(orderId);
  });

  it("fetches a list of orders", async () => {
    const res = await aprimo.orders.get({ pageSize: 5 });

    expectOk(res);
    expect(res.data?.items?.length).toBeGreaterThanOrEqual(0);
  });
});
