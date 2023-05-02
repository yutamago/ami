export type TinyCoverImageWidth = 840;
export type TinyCoverImageHeight = 200;
export type SmallCoverImageWidth = 1640;
export type SmallCoverImageHeight = 400;
export type LargeCoverImageWidth = 3360;
export type LargeCoverImageHeight = 800;
export type CoverImageDimensions<W extends number, H extends number> = { width?: W, height?: H }

export type CoverImageResourceAttributes = {
  tiny?: string;
  small?: string;
  large?: string;
  original?: string;
  meta?: {
    dimensions?: {
      tiny?: CoverImageDimensions<TinyCoverImageWidth, TinyCoverImageHeight>,
      small?: CoverImageDimensions<SmallCoverImageWidth, SmallCoverImageHeight>,
      large?: CoverImageDimensions<LargeCoverImageWidth, LargeCoverImageHeight>,
    }
  };
};


