export enum Category {
  COMMON = "Common",
  RARE = "Rare",
  EPIC = "Epic",
}

export type Character = {
  id: string;
  image: Image;
  category: Category;
  name: string;
  price: number;
  author: Author;
  cssBackground?: string;
};

export type Author = {
  id: string;
  name: string;
  profilePic: Image;
};

export type Image = {
  ariaLabel: string;
  src: string;
};

export enum PriceSort {
  LOW_TO_HIGH = "LOW_TO_HIGH",
  HIGH_TO_LOW = "HIGH_TO_LOW",
}

export enum TimeSort {
  LATEST = "LATEST",
  OLDEST = "OLDEST",
}

export enum CharacterTheme {
  HALLOWEEN = "Halloween",
  CHRISTMAS = "Christmas",
  LUNAR = "Lunar",
}

export type QueryFilters = {
  lowestPrice?: number;
  highestPrice?: number;
  theme?: CharacterTheme;
  tier?: Category | "All";
  priceSort?: PriceSort;
  timeSort?: TimeSort;
};
