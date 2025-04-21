/// <reference lib="dom" />

export interface Selection {
  id: string;
  title: string;
  rendition?: {
    id: string;
    publicuri: string;
  };
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
  select?: "Single" | "Multiple" | "SingleFile" | "SingleRendition";
  dialogMode?: "Default" | "Fullscreen";
  facets?: string[];
  targetOrigin?: string;
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
      throw new Error(
        "Aprimo Content Selector is only available in the browser.",
      );
    }

    const win = window as typeof globalThis & Window;

    const tenantUrl = `https://${environment}.dam.aprimo.com`;
    const encoded = win.btoa(JSON.stringify(options));
    const selectorUrl = `${tenantUrl}/dam/selectcontent#options=${encoded}`;

    const listener = (event: MessageEvent) => {
      if (event.origin !== tenantUrl) return;
      if (!event.data?.result) return;

      callback(event.data);
      window.removeEventListener("message", listener);
    };

    win.addEventListener("message", listener, false);

    win.open(selectorUrl, "AprimoContentSelector");
  },
});
