export type BaseEpisodicResourceAttributes = {
  /**
   * minimum: 1
   */
  episodeCount?: null | number;

  /**
   * Length of the episode in minutes
   * minimum: 1
   * format: minutes
   */
  episodeLength?: null | number;

  /**
   * minimum: 1
   * format: minutes
   */
  readonly totalLength?: null | number;
}
