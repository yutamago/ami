export type TinyAvatarWidth = 40;
export type SmallAvatarWidth = 64;
export type MediumAvatarWidth = 100;
export type LargeAvatarWidth = 200;
export type AvatarDimensions<T extends number> = { width?: T, height?: T }

export type AvatarResourceAttributes = {
  tiny?: string;
  small?: string;
  medium?: string;
  large?: string;
  original?: string;
  meta?: {
    dimensions?: {
      tiny?: AvatarDimensions<TinyAvatarWidth>;
      small?: AvatarDimensions<SmallAvatarWidth>;
      medium?: AvatarDimensions<MediumAvatarWidth>;
      large?: AvatarDimensions<LargeAvatarWidth>;
    };
  };
}
