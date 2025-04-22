import {
  CreateFrom,
  DownloadOrder,
  EmailOrder,
  FtpResortOrder,
  OrderTarget,
  PublicCdnOrder,
} from "../../model";
import { ApiResult } from "../../client";
import { HttpClient } from "../../http";
import { Order } from "../../model/Order";
import { PagedCollection } from "../../model/PagedCollection";
import { QueryParams } from "../../model/QueryParams";
import { buildHeaders } from "../../utils";
import { Expander } from "../../expander";

export type CreateOrderTarget = CreateFrom<OrderTarget>;

export type CreateDownloadOrderRequest = Omit<
  CreateFrom<DownloadOrder>,
  "targets"
> & {
  type: "download";
  targets: CreateOrderTarget[];
};

export type CreateEmailOrderRequest = Omit<
  CreateFrom<EmailOrder>,
  "targets"
> & {
  type: "email";
  targets: CreateOrderTarget[];
};

export type CreateFtpResortOrderRequest = Omit<
  CreateFrom<FtpResortOrder>,
  "targets"
> & {
  type: "ftpResort";
  targets: CreateOrderTarget[];
};

export type CreatePublicCdnOrderRequest = Omit<
  CreateFrom<PublicCdnOrder>,
  "targets"
> & {
  type: "publicCdn";
  targets: CreateOrderTarget[];
};

export type CreateOrderRequest =
  | CreateDownloadOrderRequest
  | CreateEmailOrderRequest
  | CreateFtpResortOrderRequest
  | CreatePublicCdnOrderRequest;

export const orders = (client: HttpClient) => ({
  get: async (
    params?: QueryParams,
    expander?: Expander,
  ): Promise<ApiResult<PagedCollection<Order>>> => {
    const headers = buildHeaders(params, expander);

    return await client.get("/api/core/orders", headers);
  },

  create: async (order: CreateOrderRequest): Promise<ApiResult<Order>> => {
    return await client.post("/api/core/orders", order);
  },

  getById: async (id: string): Promise<ApiResult<Order>> => {
    return await client.get(`/api/core/order/${id}`);
  },
});
