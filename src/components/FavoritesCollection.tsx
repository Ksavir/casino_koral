"use client";

import { useMemo } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import type { Game } from "@/types/game";
import { GameCollection } from "./GameCollection";

type FavoritesCollectionProps = {
  games: Game[];
};

export function FavoritesCollection({ games }: FavoritesCollectionProps) {
  const { favoriteSet } = useFavorites();
  const favoriteGames = useMemo(() => games.filter((game) => favoriteSet.has(game.id)), [favoriteSet, games]);

  return (
    <GameCollection
      title="Favorite Games"
      eyebrow="Saved tables"
      description="Every game you marked as a favorite, gathered into one focused collection."
      games={favoriteGames}
      emptyTitle="No favorites yet"
      emptyDescription="Return to the lobby and tap the heart on a game card to save it here."
    />
  );
}
