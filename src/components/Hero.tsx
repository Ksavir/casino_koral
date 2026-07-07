"use client";


import type { Game } from "@/types/game";
import { SearchAutocomplete } from "./SearchAutocomplete";
import { ThemeToggle } from "./ThemeToggle";

type HeroProps = {
  games: Game[];
  search: string;
  onSearchChange: (value: string) => void;
};

export function Hero({ games, search, onSearchChange }: HeroProps) {
  const featured = games.find((game) => game.genre === "Shooter") ?? games[0];

  return (
    <section className="relative isolate min-h-[34rem] overflow-hidden border-b border-chalk/10 px-5 pb-12 pt-6 sm:px-8 lg:px-12">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url(${featured?.thumbnail ?? ""})` }}
      />
      <div className="theme-hero-shade absolute inset-0 -z-10" />
      <div className="theme-hero-fade absolute bottom-0 left-0 right-0 -z-10 h-36" />

      <nav className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center justify-between gap-4 sm:w-auto">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-full border border-brass/50 bg-brass/15 text-brass shadow-glow">
              🪸
            </div>
            <span className="font-display text-3xl font-bold text-chalk">Casino Koral</span>
          </div>
          <div className="sm:hidden">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex w-100 items-center gap-3 sm:max-w-xl">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <SearchAutocomplete games={games} value={search} onValueChange={onSearchChange} />
        </div>
      </nav>

      <div className="max-w-4xl animate-rise">
        <p className="mb-4 inline-flex items-center rounded-full border border-brass/30 bg-brass/10 px-3 py-1 text-xs font-black uppercase tracking-[0.26em] text-amber-400">
          Free-to-play casino lobby
        </p>
        <h1 className="max-w-xl font-display text-6xl font-bold leading-[0.88] text-chalk sm:text-4xl lg:text-7xl">
          Find your next winning table.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-chalk/76">
          Browse free games by genre, filter them, keep favorites, and open each title for the full card.
        </p>
      </div>

    </section>
  );
}
