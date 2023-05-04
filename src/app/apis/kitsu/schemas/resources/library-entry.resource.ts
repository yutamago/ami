import {KitsuIdTypeSchema} from "../kitsu-id-type.schema";
import {ResourceTypesEnum} from "../resource-types.enum";
import {SelfLink} from "../links/self.link";
import {BaseResourceAttributes} from "./base.resource";
import {LibraryEntriesRelationships} from "../relationships/relationships";

enum LibraryEntriesStatusEnum {
  completed = 'completed',
  current = 'current',
  dropped = 'dropped',
  on_hold = 'on_hold',
  planned = 'planned',
}

export enum LibraryEntriesReactionSkippedEnum {
  unskipped = 'unskipped',
  skipped = 'skipped',
  ignored = 'ignored',
}

export type LibraryEntriesResourceRelationships = LibraryEntriesRelationships;


export type LibraryEntriesResourceAttributes = BaseResourceAttributes & {
  status?: LibraryEntriesStatusEnum;
  /**
   * Current episode or chapter.
   * Example: 13
   */
  progress?: number;
  /**
   * Manga only
   */
  volumesOwned?: number;
  reconsuming?: boolean;
  reconsumeCount?: number;
  notes?: string;
  private?: boolean;
  reactionSkipped?: LibraryEntriesReactionSkippedEnum;

  /**
   * ISO 8601 of last chapter/episode change
   *
   * Example: 2016-01-15T05:53:48.037Z
   */
  progressedAt?: string;

  /**
   * ISO 8601 of when the user consumed the first chapter/episode
   */
  startedAt?: string;

  /**
   * ISO 8601 of when the user consumed the last chapter/episode
   *
   * Example: 2016-01-15T05:53:48.037Z
   */
  finishedAt?: string;

  /**
   * 2,3..20 rating scale, displayed as 1,1.5..10
   * Example: 14
   */
  ratingTwenty?: number;
};

export type LibraryEntriesResource = KitsuIdTypeSchema<ResourceTypesEnum.libraryEntries> & {
  links?: SelfLink;
  attributes?: LibraryEntriesResourceAttributes;
  relationships?: LibraryEntriesResourceRelationships;
}
