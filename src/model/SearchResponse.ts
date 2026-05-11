import { Facet } from "./Facet";
import { Record } from "./Record";
import { PagedCollection } from "./PagedCollection";

/**
 * Represents a complete search response, including a paged collection of hits
 * and optional facet information. Inherits `items`, `page`, `pageSize`,
 * `skip`, `take`, `totalCount` from {@link PagedCollection}.
 */
export interface SearchResponse extends PagedCollection<Record> {
  /**
   * Collection of facet results from the search. Each facet contains
   * aggregated counts for field values.
   */
  facets: Facet[];
  /**
   * List of facet names that were truncated from the search results due to
   * size limits.
   */
  truncatedFacets: string[];
}
