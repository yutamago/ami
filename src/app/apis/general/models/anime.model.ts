// enum AnimeModelTypes {
//   TV
// }

import {AnimeResource} from "../../kitsu/schemas/resources/anime.resource";
import {LibraryEntriesResource} from "../../kitsu/schemas/resources/library-entry.resource";
import {formatDate} from "@angular/common";

export type AnimeModel = {
  id: {
    kitsu?: string;
    aniList?: string;
    myAnimeList?: string;
  };

  meta?: {
    canonicalTitle: string;
    alternativeTitles?: string[];

    posterImage?: string;
    synopsis?: string;
    type?: string;
    categories?: string[];
    producers?: string;

    totalEpisodes?: number;

    rating?: number;
    status?: string;
  };

  user?: {
    status?: string;
    currentProgress?: number;
    rating?: number;
    lastProgressed?: string;
  };

}

export class AnimeModelTransformer {
  public static fromKitsu(kitsuAnime: AnimeResource, kitsuLibraryEntry: LibraryEntriesResource): AnimeModel {
    const animeModel: AnimeModel = {
      id: {kitsu: kitsuAnime.id?.toString()}
    };

    AnimeModelTransformer.mergeKitsu(animeModel, kitsuAnime, kitsuLibraryEntry);

    return animeModel;
  }

  public static mergeKitsu(target: AnimeModel, kitsuAnime: AnimeResource, kitsuLibraryEntry: LibraryEntriesResource): AnimeModel {
    target.meta ??= {canonicalTitle: kitsuAnime.attributes?.canonicalTitle ?? ''};
    target.meta.alternativeTitles = kitsuAnime.attributes?.abbreviatedTitles; // TODO: sprachen
    target.meta.synopsis = kitsuAnime.attributes?.description;
    // TODO: target.meta.categories
    target.meta.totalEpisodes = kitsuAnime.attributes?.episodeCount ?? undefined;
    target.meta.posterImage = kitsuAnime.attributes?.posterImage?.small ?? undefined;
    target.meta.type = kitsuAnime.attributes?.subtype ?? undefined;

    const rating = kitsuAnime.attributes?.averageRating;
    if(rating) {
      target.meta.rating = Number.parseFloat(rating);
    }

    target.meta.status = kitsuAnime.attributes?.status;

    target.user ??= {};
    target.user.currentProgress = kitsuLibraryEntry.attributes?.progress;
    target.user.rating = kitsuLibraryEntry.attributes?.ratingTwenty;
    target.user.status = kitsuLibraryEntry.attributes?.status;

    const lastUpdated = kitsuLibraryEntry.attributes?.progressedAt;
    if(lastUpdated) {
      target.user.lastProgressed = formatDate(new Date(lastUpdated), 'dd.MM.yyyy', 'en-US');
    }


    return target;
  }
}
