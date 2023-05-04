import {KitsuIdTypeSchema} from "../kitsu-id-type.schema";
import {ResourceTypesEnum} from "../resource-types.enum";
import {SelfRelatedLink} from "../links/self-related.link";

export type Relationship<T extends ResourceTypesEnum> = {
  links?: SelfRelatedLink;
  data?: Array<KitsuIdTypeSchema<T>> | KitsuIdTypeSchema<T>;
}
export type RelationshipOne<T extends ResourceTypesEnum> = {
  links?: SelfRelatedLink;
  data?: KitsuIdTypeSchema<T>;
}
export type RelationshipMany<T extends ResourceTypesEnum> = {
  links?: SelfRelatedLink;
  data?: Array<KitsuIdTypeSchema<T>>;
}

export type AnimeRelationship = {
  anime?: RelationshipOne<ResourceTypesEnum.anime>;
}
export type BlocksRelationship = {
  blocks?: Relationship<ResourceTypesEnum.blocks>;
}
export type CategoriesRelationship = {
  categories?: Relationship<ResourceTypesEnum.categories>;
}
export type ChaptersRelationship = {
  chapters?: Relationship<ResourceTypesEnum.chapters>;
}
export type CharactersRelationship = {
  characters?: Relationship<ResourceTypesEnum.characters>;
}
export type EpisodeRelationship = {
  episode?: Relationship<ResourceTypesEnum.episode>;
}
export type EpisodesRelationship = {
  episodes?: Relationship<ResourceTypesEnum.episodes>;
}
export type FavoritesRelationship = {
  favorites?: Relationship<ResourceTypesEnum.favorites>;
}
export type FollowersRelationship = {
  followers?: Relationship<ResourceTypesEnum.followers>;
}
export type FollowingRelationship = {
  following?: Relationship<ResourceTypesEnum.following>;
}
export type GroupsRelationship = {
  groups?: Relationship<ResourceTypesEnum.groups>;
}
export type LibraryEntriesRelationship = {
  libraryEntries?: Relationship<ResourceTypesEnum.libraryEntries>;
}
export type LinkedAccountsRelationship = {
  linkedAccounts?: Relationship<ResourceTypesEnum.linkedAccounts>;
}
export type MangaRelationship = {
  manga?: Relationship<ResourceTypesEnum.manga>;
}
export type MediaRelationship = {
  media?: Relationship<ResourceTypesEnum.media>;
}
export type MediaRelationshipsRelationship = {
  mediaRelationships?: Relationship<ResourceTypesEnum.mediaRelationships>;
}
export type NotificationSettingsRelationship = {
  notificationSettings?: Relationship<ResourceTypesEnum.notificationSettings>;
}
export type OneSignalPlayersRelationship = {
  oneSignalPlayers?: Relationship<ResourceTypesEnum.oneSignalPlayers>;
}
export type PinnedPostRelationship = {
  pinnedPost?: Relationship<ResourceTypesEnum.pinnedPost>;
}
export type PostsRelationship = {
  posts?: Relationship<ResourceTypesEnum.posts>;
}
export type ProductionsRelationship = {
  productions?: Relationship<ResourceTypesEnum.productions>;
}
export type ProfileLinksRelationship = {
  profileLinks?: Relationship<ResourceTypesEnum.profileLinks>;
}
export type QuotesRelationship = {
  quotes?: Relationship<ResourceTypesEnum.quotes>;
}
export type ReviewsRelationship = {
  reviews?: Relationship<ResourceTypesEnum.reviews>;
}
export type RoleRelationship = {
  role?: Relationship<ResourceTypesEnum.role>;
}
export type StaffRelationship = {
  staff?: Relationship<ResourceTypesEnum.staff>;
}
export type StatsRelationship = {
  stats?: Relationship<ResourceTypesEnum.stats>;
}
export type StreamingLinksRelationship = {
  streamingLinks?: Relationship<ResourceTypesEnum.streamingLinks>;
}
export type UserRelationship = {
  user?: Relationship<ResourceTypesEnum.user>;
}
export type UserRolesRelationship = {
  userRoles?: Relationship<ResourceTypesEnum.userRoles>;
}
export type UsersRelationship = {
  users?: Relationship<ResourceTypesEnum.users>;
}
export type VideosRelationship = {
  videos?: Relationship<ResourceTypesEnum.videos>;
}
export type WaifuRelationship = {
  waifu?: Relationship<ResourceTypesEnum.waifu>;
}
export type GenresRelationship = {
  genres?: Relationship<ResourceTypesEnum.genres>;
}
export type CastingsRelationship = {
  genres?: Relationship<ResourceTypesEnum.castings>;
}
export type InstallmentsRelationship = {
  genres?: Relationship<ResourceTypesEnum.installments>;
}
export type MappingsRelationship = {
  genres?: Relationship<ResourceTypesEnum.mappings>;
}
export type AnimeProductionsRelationship = {
  genres?: Relationship<ResourceTypesEnum.animeProductions>;
}
export type AnimeCharactersRelationship = {
  genres?: Relationship<ResourceTypesEnum.animeCharacters>;
}
export type AnimeStaffRelationship = {
  genres?: Relationship<ResourceTypesEnum.animeStaff>;
}
export type DramaRelationship = {
  drama?: Relationship<ResourceTypesEnum.drama>;
}
export type MediaReactionRelationship = {
  mediaReaction?: Relationship<ResourceTypesEnum.mediaReaction>;
}
export type NextUnitRelationship = {
  nextUnit?: Relationship<ResourceTypesEnum.nextUnit>;
}
export type ReviewRelationship = {
  review?: Relationship<ResourceTypesEnum.review>;
}
export type UnitRelationship = {
  unit?: Relationship<ResourceTypesEnum.unit>;
}


export type MediaRelationships =
  CastingsRelationship &
  CategoriesRelationship &
  CharactersRelationship &
  GenresRelationship &
  InstallmentsRelationship &
  MappingsRelationship &
  MediaRelationshipsRelationship &
  ProductionsRelationship &
  QuotesRelationship &
  ReviewsRelationship &
  StaffRelationship;

export type BaseEpisodicRelationships = EpisodesRelationship;

export type AnimeRelationships =
  BaseEpisodicRelationships &
  StreamingLinksRelationship &
  AnimeProductionsRelationship &
  AnimeCharactersRelationship &
  AnimeStaffRelationship;


export type LibraryEntriesRelationships =
  AnimeRelationship &
  DramaRelationship &
  MangaRelationship &
  MediaReactionRelationship &
  MediaRelationship &
  NextUnitRelationship &
  ReviewRelationship &
  UnitRelationship &
  UserRelationship;
