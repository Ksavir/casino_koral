"use client";

import { useMemo, useState } from "react";
import { filterGames, getUniqueValues, groupGamesByGenre, sortGames } from "@/lib/games";
import type { Game, SortOption } from "@/types/game";
import { useFavorites } from "@/hooks/useFavorites";
import { GameSlider } from "./GameSlider";
import { RecentlyViewed } from "./RecentlyViewed";
import { SelectField } from "./SelectField";

type CasinoLobbyProps = {
  games: Game[];
  search: string;
};

function formatGenreTitle(genreName: string) {
  return /games?$/i.test(genreName) ? genreName : `${genreName} Games`;
}

export function CasinoLobby({ games, search }: CasinoLobbyProps) {
  const [genre, setGenre] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const { favoriteIds, favoriteSet, toggleFavorite } = useFavorites();

  const genres = useMemo(() => getUniqueValues(games, "genre"), [games]);
  const platforms = useMemo(() => getUniqueValues(games, "platform"), [games]);
  const genreOptions = useMemo(
    () => [{ label: "All genres", value: "all" }, ...genres.map((value) => ({ label: value, value }))],
    [genres]
  );
  const platformOptions = useMemo(
    () => [{ label: "All platforms", value: "all" }, ...platforms.map((value) => ({ label: value, value }))],
    [platforms]
  );
  const sortOptions = useMemo(
    () => [
      { label: "Relevance", value: "relevance" },
      { label: "Title", value: "title" },
      { label: "Release date", value: "release-date" },
      { label: "Publisher", value: "publisher" }
    ],
    []
  );

  const visibleGames = useMemo(() => {
    return sortGames(filterGames(games, search, genre, platform), sortBy);
  }, [games, genre, platform, search, sortBy]);

  const groupedGames = useMemo(() => groupGamesByGenre(visibleGames), [visibleGames]);
  const favoriteGames = useMemo(
    () => visibleGames.filter((game) => favoriteSet.has(game.id)),
    [favoriteSet, visibleGames]
  );

  return (
    <main>
      <section className="relative top-0 z-50 border-b border-chalk/10 bg-ink/82 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-12">
        <div className="grid gap-3 lg:grid-cols-3">
          <SelectField label="Genre" value={genre} options={genreOptions} onValueChange={setGenre} />

          <SelectField
            label="Sort"
            value={sortBy}
            options={sortOptions}
            onValueChange={(nextValue) => setSortBy(nextValue as SortOption)}
          />
        </div>


      </section>

      <RecentlyViewed games={games} favoriteSet={favoriteSet} onToggleFavorite={toggleFavorite} />

      {favoriteGames.length > 0 ? (
        <GameSlider
          title="Favorite Games"
          games={favoriteGames}
          favoriteSet={favoriteSet}
          onToggleFavorite={toggleFavorite}
          viewAllHref="/favorites"
        />
      ) : null}

      {visibleGames.length === 0 ? (
        <section className="grid min-h-[24rem] place-items-center px-5 py-16 text-center">
          <div className="max-w-lg">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-brass">No hands dealt</p>
            <h2 className="mt-2 font-display text-5xl font-bold text-chalk">No games found</h2>
            <p className="mt-4 text-chalk/70">Try a different search, genre, or platform filter.</p>
          </div>
        </section>
      ) : (
        Object.entries(groupedGames).map(([genreName, genreGames]) => (
          <GameSlider
            key={genreName}
            title={formatGenreTitle(genreName)}
            games={genreGames}
            favoriteSet={favoriteSet}
            onToggleFavorite={toggleFavorite}
            viewAllHref={`/genres/${encodeURIComponent(genreName)}`}
          />
        ))
      )}
    </main>
  );
}
