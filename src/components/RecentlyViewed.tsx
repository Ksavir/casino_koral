"use client";

import { Clock3 } from "lucide-react";
import type { Game } from "@/types/game";
import { useRecentlyViewedIds } from "@/hooks/useRecentlyViewed";
import { GameCard } from "./GameCard";

type RecentlyViewedProps = {
  games: Game[];
  favoriteSet: Set<number>;
  onToggleFavorite: (id: number) => void;
};

export function RecentlyViewed({ games, favoriteSet, onToggleFavorite }: RecentlyViewedProps) {
  const recentIds = useRecentlyViewedIds();
  const recentGames = recentIds
    .map((id) => games.find((game) => game.id === id))
    .filter((game): game is Game => Boolean(game));

  if (recentGames.length === 0) {
    return null;
  }

  return (
    <section className="border-y border-brass/20 bg-brass/[0.06] py-8">
      <div className="mb-4 flex items-center gap-3 px-6 sm:px-8 lg:px-12">
        <Clock3 className="size-5 text-brass" />
        <h2 className="font-display text-3xl font-bold leading-none text-chalk">Recently viewed</h2>
      </div>
      <div className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-2 sm:gap-4 sm:px-8 lg:px-12">
        {recentGames.map((game) => (
          <div key={game.id} className="snap-start">
            <GameCard game={game} isFavorite={favoriteSet.has(game.id)} onToggleFavorite={onToggleFavorite} />
          </div>
        ))}
      </div>
    </section>
  );
}
