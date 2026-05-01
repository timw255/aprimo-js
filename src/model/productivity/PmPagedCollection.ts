export interface PmLink {
  href: string;
}

export interface PmPagedLinks {
  self?: PmLink;
  first?: PmLink;
  last?: PmLink;
  next?: PmLink;
  prev?: PmLink;
}

export interface PmPagedCollection<T, EmbeddedKey extends string = string> {
  _total: number;
  _embedded?: { [K in EmbeddedKey]?: T[] };
  _links?: PmPagedLinks;
}
