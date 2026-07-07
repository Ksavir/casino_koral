"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import type { Game } from "@/types/game";
import { Button } from "./Button";
import { GameCard } from "./GameCard";

type GameSliderProps = {
  title: string;
  games: Game[];
  favoriteSet: Set<number>;
  onToggleFavorite: (id: number) => void;
  viewAllHref: string;
};

export function GameSlider({ title, games, favoriteSet, onToggleFavorite, viewAllHref }: GameSliderProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    rowRef.current?.scrollBy({
      left: direction === "left" ? -620 : 620,
      behavior: "smooth"
    });
  }

  return (
    <section className="animate-rise py-6">
      <div className="mb-4 flex items-end justify-between gap-4 px-6 sm:px-8 lg:px-12">
        <div className="min-w-0">
          <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
            <h2 className="font-display text-3xl font-bold leading-none text-chalk sm:text-4xl">{title}</h2>
            <span className="rounded-full border border-brass/25 bg-brass/10 px-2.5 py-1 text-xs font-black uppercase tracking-[0.16em] text-brass">
              {games.length} {games.length === 1 ? "game" : "games"}
            </span>
          </div>
        </div>
        <Link
          href={viewAllHref}
          className="focus-ring shrink-0 rounded-sm text-xs font-black uppercase tracking-[0.24em] text-brass transition hover:text-chalk"
        >
          View all
        </Link>
      </div>

      <div className="relative">
        <Button
          variant="ghost"
          className="absolute left-2 top-1/2 z-10 hidden size-11 -translate-y-1/2 rounded-full bg-ink/75 px-0 shadow-casino backdrop-blur sm:inline-flex lg:left-5"
          onClick={() => scroll("left")}
          aria-label={`Scroll ${title} left`}
        >
          <ChevronLeft className="size-5" />
        </Button>
        <Button
          variant="ghost"
          className="absolute right-2 top-1/2 z-10 hidden size-11 -translate-y-1/2 rounded-full bg-ink/75 px-0 shadow-casino backdrop-blur sm:inline-flex lg:right-5"
          onClick={() => scroll("right")}
          aria-label={`Scroll ${title} right`}
        >
          <ChevronRight className="size-5" />
        </Button>

        <div
          ref={rowRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:gap-4 sm:px-8 lg:px-12"
        >
          {games.map((game) => (
            <div key={game.id} className="snap-start">
              <GameCard game={game} isFavorite={favoriteSet.has(game.id)} onToggleFavorite={onToggleFavorite} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
