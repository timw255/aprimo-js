import { ApiLink } from "./ApiLink";
import { Counter } from "./Counter";

export interface CounterCollection {
  items: Counter[];
  _links: CounterCollectionLinks;
}

export interface CounterCollectionLinks {
  self: ApiLink;
}
