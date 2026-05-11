/**
 * Represents a facet for search results.
 */
export interface Facet {
  /** The name the client gave this facet. */
  name: string;
  /** The values for this facet. */
  values: string[];
}
