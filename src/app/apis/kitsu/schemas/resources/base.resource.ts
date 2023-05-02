export type BaseResourceAttributes = {
  /**
   * Resource creation
   *     example: '2013-02-20T16:00:13.609Z'
   */
  readonly createdAt: string;

  /**
   * Most recent resource update
   *     example: '2017-12-20T00:00:09.270Z'
   */
  readonly updatedAt: string;
}
