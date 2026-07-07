import type { Game, GameDetails, SortOption } from "@/types/game";

const API_BASE_URL = "https://www.freetogame.com/api";

export async function getGames(): Promise<Game[]> {
  const response = await fetch(`${API_BASE_URL}/games`, {
    next: { revalidate: 60 * 60 }
  });

  if (!response.ok) {
    throw new Error("Could not load games from FreeToGame.");
  }

  return response.json();
}

export async function getGameDetails(id: string): Promise<GameDetails> {
  const response = await fetch(`${API_BASE_URL}/game?id=${id}`, {
    next: { revalidate: 60 * 60 }
  });

  if (!response.ok) {
    throw new Error("Could not load this game.");
  }

  return response.json();
}

export function getUniqueValues(games: Game[], key: keyof Pick<Game, "genre" | "platform" | "publisher">) {
  return Array.from(new Set(games.map((game) => game[key]).filter(Boolean))).sort((a, b) =>
    a.localeCompare(b)
  );
}

export function filterGames(games: Game[], search: string, genre: string, platform: string) {
  const normalizedSearch = search.trim().toLowerCase();

  return games.filter((game) => {
    const matchesSearch = normalizedSearch.length === 0 || game.title.toLowerCase().includes(normalizedSearch);
    const matchesGenre = genre === "all" || game.genre === genre;
    const matchesPlatform = platform === "all" || game.platform === platform;

    return matchesSearch && matchesGenre && matchesPlatform;
  });
}

export function sortGames(games: Game[], sortBy: SortOption) {
  return [...games].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "publisher") {
      return a.publisher.localeCompare(b.publisher);
    }

    if (sortBy === "release-date") {
      return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    }

    return a.id - b.id;
  });
}

export function groupGamesByGenre(games: Game[]) {
  return games.reduce<Record<string, Game[]>>((groups, game) => {
    groups[game.genre] = groups[game.genre] ?? [];
    groups[game.genre].push(game);
    return groups;
  }, {});
}
