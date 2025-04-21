import { ApiLink } from "./ApiLink";
import { Image } from "./Image";
import { User } from "./User";

export interface Watermark {
  createdOn: string;
  id: string;
  modifiedOn: string;
  name: string;
  position: string;
  tag: string;
  _links: WatermarkLinks;
  _embedded?: {
    [K in Exclude<
      keyof WatermarkLinks,
      "self"
    >]?: WatermarkLinks[K] extends ApiLink<infer R> ? R : never;
  };
}

export interface WatermarkLinks {
  self: ApiLink;
  image: ApiLink<Image>;
  modifiedby: ApiLink<User>;
  createdby: ApiLink<User>;
}
