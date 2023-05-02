import {KitsuIdTypeSchema} from "../kitsu-id-type.schema";
import {ResourceTypesEnum} from "../resource-types.enum";
import {SelfLink} from "../links/self.link";
import {CoverImageResourceAttributes} from "./cover-image.resource";
import {PosterImageResourceAttributes} from "./poster-image.resource";
import {BaseResourceAttributes} from "./base.resource";
import {BaseSluggableResourceAttributes} from "./base-sluggable.resource";
import {BaseEpisodicResourceAttributes} from "./base-episodic.resource";
import {AnimeRelationships, MediaRelationships} from "../relationships/relationships";

export type AnimeResource = KitsuIdTypeSchema<ResourceTypesEnum.anime> & {
  links?: SelfLink;
  attributes?: AnimeResourceAttributes;
  relationships?: AnimeResourceRelationships;
}

enum AnimeResourceSubtypesEnum {
  ONA = 'ONA',
  OVA = 'OVA',
  TV = 'TV',
  movie = 'movie',
  music = 'music',
  special = 'special',
}

enum MediaStatusEnum {
  tba = 'tba',
  finished = 'finished',
  current = 'current',
  upcoming = 'upcoming',
  unreleased = 'unreleased'
}

export type MediaResourceAttributes = BaseResourceAttributes & BaseSluggableResourceAttributes & {
  /**
   * Short synopsis of the media
   */
  description?: string;

  /**
   * Banner displayed at the top of the media page
   */
  coverImage?: null | CoverImageResourceAttributes;
  posterImage?: null | PosterImageResourceAttributes;

  /**
   * Localised media titles. Any ISO 639-1 (`en`) or ICU Locale (`en_us`) may appear here.
   * Example:
   *   en: Trigun
   *   en_jp: Trigun
   *   ja_jp: トライガン
   */
  titles?: { [language: string]: string };

  /**
   * The most commonly used title from the `titles` attribute
   */
  canonicalTitle?: string;

  /**
   * Abbreviations or other names the media is known by
   */
  abbreviatedTitles?: string[];

  /**
   * The bayesian average of the media. Requires at least 50 user ratings.
   *       readOnly: true
   *       maximum: 100
   *       minimum: 10
   *       format: percentage
   */
  readonly averageRating?: null | string;

  /**
   * Number of user ratings for each rating value. Key is the rating stored as 2,3..20 and displayed as 1,1.5..10
   */
  readonly ratingFrequencies?: {
    /**
     * Minimum rating of 1/10
     */
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
    13: string;
    14: string;
    15: string;
    16: string;
    17: string;
    18: string;
    19: string;
    /**
     * Maximum rating of 10/10
     */
    20: string;
  };

  /**
   * Number of users who have the media in their library
   * Minimum: 0
   * Example: 44322
   */
  readonly userCount?: number;

  /**
   * Number of users who have favorited the media
   * minimum: 0
   * example: 1219
   */
  readonly favoritesCount?: null | number;

  /**
   * Date the media started airing/publishing. YYYY-MM-DD
   * Example: '1998-04-01'
   */
  startDate?: null | string;

  /**
   * Date the media finished airing/publishing. YYYY-MM-DD
   * Example: '1998-09-30'
   */
  endDate?: null | string;

  readonly nextRelease?: string;

  /**
   * minimum: 1
   * example: 165
   */
  readonly popularityRank?: number;

  /**
   * minimum: 1
   * example: 217
   */
  readonly ratingRank?: number;

  ageRating?: AgeRatingEnum;

  /**
   * Additional content warnings
   *       example: Teens 13 or older
   */
  ageRatingGuide?: null | string;

  /**
   * `tba` (to be announced) if there is no start/end dates `unreleased` if start date is in the future and `upcoming` if start date is within 3 months
   */
  readonly status?: MediaStatusEnum;

  /**
   * Expected release year or season
   */
  tba?: null | string;
}

export type AnimeResourceAttributes = MediaResourceAttributes & BaseEpisodicResourceAttributes & {
  subtype?: AnimeResourceSubtypesEnum;

  /**
   * Promotional video for the media. For short ONA/OVAs, this may be the actual short if it was released on YouTube officially
   */
  youtubeVideoId?: string | null;

  /**
   * Readonly
   */
  nsfw?: boolean;
}


export type AnimeResourceRelationships =
  MediaRelationships &
  AnimeRelationships;


export enum AgeRatingEnum {
  G = 'G',
  PG = 'PG',
  R = 'R',
  R18 = 'R18'
}
