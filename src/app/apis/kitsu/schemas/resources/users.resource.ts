import {KitsuIdTypeSchema} from "../kitsu-id-type.schema";
import {SelfLink} from "../links/self.link";
import {
  BlocksRelationship,
  FavoritesRelationship,
  FollowersRelationship,
  FollowingRelationship,
  LibraryEntriesRelationship,
  LinkedAccountsRelationship,
  NotificationSettingsRelationship,
  OneSignalPlayersRelationship,
  PinnedPostRelationship,
  ProfileLinksRelationship,
  ReviewsRelationship,
  StatsRelationship,
  UserRolesRelationship,
  WaifuRelationship
} from "../relationships/relationships";
import {ResourceTypesEnum} from "../resource-types.enum";
import {CoverImageResourceAttributes} from "./cover-image.resource";
import {AvatarResourceAttributes} from "./avatar.resource";
import {BaseResourceAttributes} from "./base.resource";

export type UsersResource = KitsuIdTypeSchema<ResourceTypesEnum.users> & {
  links?: SelfLink;
  attributes?: UsersResourceAttributes;
  relationships?: UsersResourceRelationships;
}

export type UsersResourceAttributes = BaseResourceAttributes & {

  /**
   * vikhyat
   */
  name?: string;
  pastNames?: Array<string>;
  /**
   * vikhyat
   */
  slug?: string;
  /**
   * Max length of 500 characters
   */
  about?: string;
  location?: string;
  /**
   * Waifu
   */
  waifuOrHusbando?: string;
  /**
   * 1716
   */
  followersCount?: number;
  /**
   * 2031
   */
  followingCount?: number;
  /**
   * Deprecated, use the `stats` relationship
   */
  lifeSpentOnAnime?: number;
  birthday?: string | null;
  gender?: string | null;
  commentsCount?: number;
  favoritesCount?: number;
  likesGivenCount?: number;
  reviewsCount?: number;
  likesReceivedCount?: number;
  postsCount?: number;
  ratingsCount?: number;
  mediaReactionsCount?: number;
  proExpiresAt?: string;
  title?: string | null;
  /**
   * Completed profile onboarding
   */
  profileCompleted?: boolean;
  /**
   * Completed feeds onboarding
   */
  feedCompleted?: boolean;
  /**
   * Deprecated, use the `profileLinks` relationship
   */
  website?: string;
  proTier?: string;
  avatar?: AvatarResourceAttributes;
  coverImage?: null | CoverImageResourceAttributes;
  /**
   * Logged in user only
   */
  email?: string;
  /**
   * Logged in user only. Used to set new password, always displays null
   */
  password?: string | null;
  /**
   * Logged in user only. Email confirmed
   */
  confirmed?: boolean;
  /**
   * Logged in user only
   */
  previousEmail?: string | null;
  /**
   * Logged in user only
   */
  language?: string | null;
  /**
   * Logged in user only
   */
  timeZone?: string | null;
  /**
   * Logged in user only.
   */
  country?: string;
  /**
   * Logged in user only
   */
  shareToGlobal?: boolean;
  /**
   * Logged in user only
   */
  titleLanguagePreference?: 'canonical' | 'romanized' | 'english';
  /**
   * Logged in user only. Toggle visibility of NSFW media and posts
   */
  sfwFilter?: boolean;
  /**
   * * `advanced` - 0.5, 1...10 * `regular` - 0.5, 1...5 * `simple` - :( :| :) :D Logged in user only
   */
  ratingSystem?: 'advanced' | 'regular' | 'simple';
  /**
   * Logged in user only
   */
  theme?: 'dark' | 'light';
  /**
   * Logged in user only
   */
  facebookId?: string | null;
  /**
   * Logged in user only
   */
  hasPassword?: boolean;
  status?: string;
  subscribedToNewsletter?: boolean;
  /**
   * Logged in user only. Aozora user imports that had Aozora Pro - treated as Kitsu Pro
   */
  aoPro?: string | null;
}

export type UsersResourceRelationships =
  BlocksRelationship &
  FavoritesRelationship &
  FollowersRelationship &
  FollowingRelationship &
  LibraryEntriesRelationship &
  LinkedAccountsRelationship &
  NotificationSettingsRelationship &
  OneSignalPlayersRelationship &
  PinnedPostRelationship &
  ProfileLinksRelationship &
  ReviewsRelationship &
  StatsRelationship &
  UserRolesRelationship &
  WaifuRelationship;

