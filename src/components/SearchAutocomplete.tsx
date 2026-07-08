"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Game } from "@/types/game";

type SearchAutocompleteProps = {
  games: Game[];
  value: string;
  onValueChange: (value: string) => void;
};

const MAX_SUGGESTIONS = 6;

export function SearchAutocomplete({ games, value, onValueChange }: SearchAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const fieldRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const router = useRouter();
  const query = value.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (query.length < 2) {
      return [];
    }

    return games
      .filter((game) => game.title.toLowerCase().includes(query))
      .sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const aStarts = aTitle.startsWith(query) ? 0 : 1;
        const bStarts = bTitle.startsWith(query) ? 0 : 1;

        return aStarts - bStarts || aTitle.localeCompare(bTitle);
      })
      .slice(0, MAX_SUGGESTIONS);
  }, [games, query]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!fieldRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const isExpanded = isOpen && suggestions.length > 0;

  function openGame(game: Game) {
    setIsOpen(false);
    onValueChange(game.title);
    router.push(`/games/${game.id}`);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isExpanded) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % suggestions.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => (current - 1 + suggestions.length) % suggestions.length);
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const activeGame = suggestions[activeIndex];

      if (activeGame) {
        openGame(activeGame);
      }
    }

    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div ref={fieldRef} className="relative min-w-0 flex-1">
      <label>
        <span className="sr-only">Search by title</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-chalk" />
        <input
          value={value}
          onChange={(event) => {
            const nextValue = event.target.value;

            onValueChange(nextValue);
            setActiveIndex(0);
            setIsOpen(nextValue.trim().length >= 2);
          }}
          onFocus={() => setIsOpen(value.trim().length >= 2)}
          onKeyDown={handleKeyDown}
          placeholder="Search games by title"
          className="focus-ring h-12 w-full rounded-full border border-brass/25 bg-ink/70 pl-12 pr-4 text-base font-bold text-chalk shadow-casino outline-none placeholder:text-chalk/42 transition hover:border-brass/70"
          role="combobox"
          aria-expanded={isExpanded}
          aria-controls={listboxId}
          aria-autocomplete="list"
        />
      </label>

      {isExpanded ? (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-brass/25 bg-ink/95 p-2 shadow-casino backdrop-blur-xl"
        >
          {suggestions.map((game, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={game.id}
                type="button"
                role="option"
                aria-selected={isActive}
                className={`focus-ring flex w-full items-center gap-3 rounded-md p-2 text-left transition ${
                  isActive ? "bg-brass/15" : "hover:bg-chalk/[0.06]"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => openGame(game)}
              >
                <span className="relative size-12 shrink-0 overflow-hidden rounded border border-chalk/10 bg-felt">
                  <Image
                    src={game.thumbnail}
                    alt={`${game.title} thumbnail`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-black text-chalk">{game.title}</span>
                  <span className="mt-1 block truncate text-xs font-bold text-chalk/58">{game.genre}</span>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
