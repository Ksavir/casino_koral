import { describe, expect, it } from "vitest";
import { filterGames, groupGamesByGenre, sortGames } from "./games";
import type { Game } from "@/types/game";

const games: Game[] = [
  {
    id: 2,
    title: "Beta Racer",
    thumbnail: "/beta.jpg",
    short_description: "Fast game",
    game_url: "https://example.com/beta",
    genre: "Racing",
    platform: "Windows",
    publisher: "Zeta",
    developer: "Dev B",
    release_date: "2022-01-01",
    freetogame_profile_url: "https://example.com/beta-profile"
  },
  {
    id: 1,
    title: "Alpha Cards",
    thumbnail: "/alpha.jpg",
    short_description: "Cards game",
    game_url: "https://example.com/alpha",
    genre: "Card Game",
    platform: "Web Browser",
    publisher: "Acme",
    developer: "Dev A",
    release_date: "2024-01-01",
    freetogame_profile_url: "https://example.com/alpha-profile"
  }
];

describe("game helpers", () => {
  it("filters games by title, genre, and platform", () => {
    expect(filterGames(games, "alpha", "Card Game", "Web Browser")).toHaveLength(1);
    expect(filterGames(games, "alpha", "Racing", "all")).toHaveLength(0);
  });

  it("sorts games by release date descending", () => {
    expect(sortGames(games, "release-date").map((game) => game.title)).toEqual(["Alpha Cards", "Beta Racer"]);
  });

  it("groups games by genre", () => {
    expect(Object.keys(groupGamesByGenre(games))).toEqual(["Racing", "Card Game"]);
  });
});
