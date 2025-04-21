import { Facet } from "./Facet";
import { Record } from "./Record";
import { PagedCollection } from "./PagedCollection";

export interface SearchResponse extends PagedCollection<Record> {
  facets: Facet[];
  truncatedFacets: string[];
}
