export type CommonParameters = {
  /**
   * Return only the provided attributes and relationships in the request response. Use a comma-deliminated list for multiple attributes/relationships
   *
   *   [Sparse Fieldsets](/#section/JSON:API/Sparse-Fieldsets)
   *   example:
   *      anime: slug
   *      categories: slug,title
   */
  fields?: {
    [fieldName: string]: string;
  };

  /**
   * Include related resources. Use a dot-seperated path to include relationships of relationships. Use a comma-deliminated list to include multiple relationships
   *
   *   [Inclusion of Related Resources](/#section/JSON:API/Inclusion-of-Related-Resources)
   *   example: characters,staff.person
   */
  include?: string;

  /**
   * Resource pagination
   *
   *   [Pagination](/#section/JSON:API/Pagination)
   */
  page?: {
    /**
     * Number of resources to return per page. Maximum value for most resources is `20`
     *       example: 20
     */
    limit?: number;

    /**
     * Number of resources to offset pagination by. Using the `links.next|prev` URL handles this for you, or you can do it manually with `limit * page` or `offset += limit`
     *       example: 0
     */
    offset?: number;
  };

  /**
   * Sort by ID or resource attributes in ascending order. Prefix with `-` to sort descending. Use a comma-deliminated list to sort by multiple attributes.
   *
   *   [Sorting](/#section/JSON:API/Sorting)
   *   example: id
   */
  sort?: string;
  filter?: {
    [filterName: string]: any;
  };
}
