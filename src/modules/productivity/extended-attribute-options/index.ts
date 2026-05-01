import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  ExtendedAttributePicklist,
  ExtendedAttributePicklistItem,
} from "../../../model/productivity/ExtendedAttributePicklist";

export interface UpdateExtendedAttributePicklistRequest {
  items: ExtendedAttributePicklistItem[];
}

export const extendedAttributeOptions = (client: HttpClient) => ({
  getPicklistOptions: async (
    eaId: number | string,
  ): Promise<ApiResult<ExtendedAttributePicklist>> => {
    return client.get(`/api/extended-attributes/${eaId}/pick-list-options`);
  },

  updatePicklistOptions: async (
    eaId: number | string,
    request: UpdateExtendedAttributePicklistRequest,
  ): Promise<ApiResult<ExtendedAttributePicklist>> => {
    return client.put(
      `/api/extended-attributes/${eaId}/pick-list-options`,
      request,
    );
  },

  getAllowedChildren: async (
    childEaId: number | string,
    parentPicklistItemId: number | string,
  ): Promise<ApiResult<ExtendedAttributePicklist>> => {
    return client.get(
      `/api/extended-attributes/${childEaId}/pick-list-options/${parentPicklistItemId}/allowed-children`,
    );
  },

  updateAllowedChildren: async (
    childEaId: number | string,
    parentPicklistItemId: number | string,
    request: UpdateExtendedAttributePicklistRequest,
  ): Promise<ApiResult<ExtendedAttributePicklist>> => {
    return client.put(
      `/api/extended-attributes/${childEaId}/pick-list-options/${parentPicklistItemId}/allowed-children`,
      request,
    );
  },
});
