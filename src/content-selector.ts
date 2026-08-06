/// <reference lib="dom" />

import { AprimoConfigError } from "./errors";

export interface Selection {
  id: string;
  title: string;
  /** Only present in `singlerendition` mode. */
  rendition?: {
    id: string;
    publicuri: string;
  };
  /** Only present in `singlefile` mode. Aprimo's own spelling — not a typo here. */
  additionaFile?: {
    additionalFileId: string;
    fileName: string;
    label: string;
    type: "Crop" | "Trim" | "Custom";
  };
}

export interface ContentSelectorOptions {
  title?: string;
  description?: string;
  accept?: string;
  limitingSearchExpression?: string;
  select?: "single" | "multiple" | "singlefile" | "singlerendition";
  /**
   * Ignored when `select` is `"singlerendition"` — Aprimo forces `"fullscreen"`.
   */
  dialogMode?: "default" | "fullscreen";
  facets?: string[];
  targetOrigin?: string;
  /**
   * Passed to `window.open` as its `windowFeatures` argument, e.g.
   * `"width=1200,height=800"` to force a popup instead of a new tab.
   * Not sent to Aprimo.
   */
  windowFeatures?: string;
}

export type ContentSelectorResult =
  | { result: "accept"; selection: Selection[] }
  | { result: "cancel" };

export const contentSelector = (environment: string) => ({
  open: (
    options: ContentSelectorOptions,
    callback: (result: ContentSelectorResult) => void,
  ) => {
    if (typeof window === "undefined") {
      throw new AprimoConfigError(
        "Aprimo Content Selector is only available in the browser.",
      );
    }

    const win = window as typeof globalThis & Window;

    const { windowFeatures, ...selectorOptions } = options;

    const tenantUrl = `https://${environment}.dam.aprimo.com`;
    const encoded = win.btoa(JSON.stringify(selectorOptions));
    const selectorUrl = `${tenantUrl}/dam/selectcontent#options=${encoded}`;

    const listener = (event: MessageEvent) => {
      if (event.origin !== tenantUrl) return;
      if (!event.data?.result) return;

      callback(event.data);
      window.removeEventListener("message", listener);
    };

    win.addEventListener("message", listener, false);

    win.open(selectorUrl, "AprimoContentSelector", windowFeatures);
  },
});
