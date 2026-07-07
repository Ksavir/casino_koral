"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { useFavorites } from "@/hooks/useFavorites";
import type { Game } from "@/types/game";
import { GameCard } from "./GameCard";

type GameCollectionProps = {
  title: string;
  eyebrow: string;
  description: string;
  games: Game[];
  emptyTitle?: string;
  emptyDescription?: string;
};

export function GameCollection({
  title,
  eyebrow,
  description,
  games,
  emptyTitle = "No games found",
  emptyDescription = "Try another collection from the lobby."
}: GameCollectionProps) {
  const { favoriteSet, toggleFavorite } = useFavorites();

  return (
    <main className="min-h-screen">
      <section className="border-b border-chalk/10 px-5 py-8 sm:px-8 lg:px-12">
        <Link href="/">
          <Button variant="ghost">Back to lobby</Button>
        </Link>
        <div className="mt-10 max-w-4xl animate-rise">
          <p className="mb-4 inline-flex rounded-full border border-brass/30 bg-brass/10 px-3 py-1 text-xs font-black uppercase tracking-[0.26em] text-brass">
            {eyebrow}
          </p>
          <div className="flex flex-wrap items-end gap-x-4 gap-y-3">
            <h1 className="font-display text-6xl font-bold leading-[0.88] text-chalk sm:text-7xl">{title}</h1>
            {/* <span className="rounded-full border border-brass/25 bg-brass/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-brass">
              {games.length} {games.length === 1 ? "game" : "games"}
            </span> */}
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-chalk/72">{description}</p>
        </div>
      </section>

      {games.length === 0 ? (
        <section className="grid min-h-[24rem] place-items-center px-5 py-16 text-center">
          <div className="max-w-lg">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-brass">Empty table</p>
            <h2 className="mt-2 font-display text-5xl font-bold text-chalk">{emptyTitle}</h2>
            <p className="mt-4 text-chalk/70">{emptyDescription}</p>
          </div>
        </section>
      ) : (
        <section className="grid gap-5 px-6 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-12 xl:grid-cols-4">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              layout="grid"
              isFavorite={favoriteSet.has(game.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </section>
      )}
    </main>
  );
}
