export type Game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
};

export type GameDetails = Game & {
  description: string;
  minimum_system_requirements?: {
    os?: string;
    processor?: string;
    memory?: string;
    graphics?: string;
    storage?: string;
  };
  screenshots?: {
    id: number;
    image: string;
  }[];
};

export type SortOption = "relevance" | "title" | "release-date" | "publisher";
