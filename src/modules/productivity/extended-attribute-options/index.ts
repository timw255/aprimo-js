import { ApiResult } from "../../../client";
import { HttpClient } from "../../../http";
import {
  ExtendedAttributePicklist,
  ExtendedAttributePicklistItem,
} from "../../../model/productivity/ExtendedAttributePicklist";

/** Payload for `extendedAttributeOptions.updatePicklistOptions` / `.updateAllowedChildren`. */
export interface UpdateExtendedAttributePicklistRequest {
  /** Picklist items — server merges/adds based on `itemId`. */
  items: ExtendedAttributePicklistItem[];
}

/**
 * Picklist-option administration for extended attributes. Extended
 * attributes can be picklists (single- or multi-select) backed by a list
 * of options; this module manages those options and the parent→child
 * relationships between cascading picklists.
 */
export const extendedAttributeOptions = (client: HttpClient) => ({
  /**
   * Return every option configured for a picklist extended attribute.
   *
   * @param eaId - Extended-attribute id.
   */
  getPicklistOptions: async (
    eaId: number | string,
  ): Promise<ApiResult<ExtendedAttributePicklist>> => {
    return client.get(`/api/extended-attributes/${eaId}/pick-list-options`);
  },

  /**
   * Replace the option set on a picklist extended attribute. Existing
   * items can be updated by including their `itemId`; new items omit it.
   */
  updatePicklistOptions: async (
    eaId: number | string,
    request: UpdateExtendedAttributePicklistRequest,
  ): Promise<ApiResult<ExtendedAttributePicklist>> => {
    return client.put(
      `/api/extended-attributes/${eaId}/pick-list-options`,
      request,
    );
  },

  /**
   * For a cascading picklist (a child picklist whose options depend on
   * the parent picklist's selection), return the allowed child options
   * for a given parent item.
   *
   * @param childEaId - Child picklist's extended-attribute id.
   * @param parentPicklistItemId - The selected parent option id.
   */
  getAllowedChildren: async (
    childEaId: number | string,
    parentPicklistItemId: number | string,
  ): Promise<ApiResult<ExtendedAttributePicklist>> => {
    return client.get(
      `/api/extended-attributes/${childEaId}/pick-list-options/${parentPicklistItemId}/allowed-children`,
    );
  },

  /** Configure which child options are allowed for a given parent option. */
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
