"use client";

import { Heart, Monitor, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/types/game";

type GameCardProps = {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  layout?: "slider" | "grid";
};

export function GameCard({ game, isFavorite, onToggleFavorite, layout = "slider" }: GameCardProps) {
  const widthClass = layout === "grid" ? "w-full" : "w-[calc(100vw-3rem)] sm:w-[18rem]";

  return (
    <article
      className={`group relative shrink-0 overflow-hidden rounded-lg border border-chalk/10 bg-ink/70 shadow-casino ring-1 ring-white/5 transition duration-300 hover:-translate-y-1 hover:border-brass/50 hover:shadow-glow ${widthClass}`}
    >
      <Link href={`/games/${game.id}`} className="focus-ring block" aria-label={`Open ${game.title} details`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-felt">
          <Image
            src={game.thumbnail}
            alt={`${game.title} thumbnail`}
            fill
            sizes={layout === "grid" ? "(max-width: 640px) calc(100vw - 3rem), 25vw" : "(max-width: 640px) calc(100vw - 3rem), 288px"}
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink to-transparent" />
        </div>
      </Link>

      <button
        type="button"
        onClick={() => onToggleFavorite(game.id)}
        className="focus-ring absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full border border-chalk/15 bg-ink/75 text-chalk backdrop-blur transition hover:border-brass hover:text-brass"
        aria-label={isFavorite ? `Remove ${game.title} from favorites` : `Add ${game.title} to favorites`}
      >
        <Heart className={`size-5 ${isFavorite ? "fill-ember text-ember" : ""}`} />
      </button>

      <div className="space-y-4 p-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-1 rounded-full border border-brass/25 bg-brass/10 px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.18em] text-brass">
            <Sparkles className="size-3" />
            {game.genre}
          </div>
          <Link href={`/games/${game.id}`} className="focus-ring rounded-sm">
            <h3 className="line-clamp-2 min-h-[3.5rem] font-display text-2xl font-bold leading-none text-chalk">
              {game.title}
            </h3>
          </Link>
        </div>

        <dl className="grid gap-2 text-xs text-chalk/70">
          <div className="flex items-center gap-2">
            <Monitor className="size-4 text-brass" />
            <dt className="sr-only">Platform</dt>
            <dd className="truncate">{game.platform}</dd>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-chalk/10 pt-3">
            <dt className="text-chalk/45">Publisher</dt>
            <dd className="truncate text-right font-semibold text-chalk">{game.publisher}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
