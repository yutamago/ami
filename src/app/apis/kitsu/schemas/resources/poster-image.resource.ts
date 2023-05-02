export type TinyPosterImageWidth = 110;
export type TinyPosterImageHeight = 156;
export type SmallPosterImageWidth = 284;
export type SmallPosterImageHeight = 402;
export type MediumPosterImageWidth = 390;
export type MediumPosterImageHeight = 554;
export type LargePosterImageWidth = 550;
export type LargePosterImageHeight = 780;
export type PosterImageDimensions<W extends number, H extends number> = { width?: W, height?: H }

export type PosterImageResourceAttributes = {
  tiny?: string;
  small?: string;
  large?: string;
  original?: string;
  meta?: {
    dimensions?: {
      tiny?: PosterImageDimensions<TinyPosterImageWidth, TinyPosterImageHeight>,
      small?: PosterImageDimensions<SmallPosterImageWidth, SmallPosterImageHeight>,
      medium?: PosterImageDimensions<MediumPosterImageWidth, MediumPosterImageHeight>,
      large?: PosterImageDimensions<LargePosterImageWidth, LargePosterImageHeight>,
    }
  };
};
