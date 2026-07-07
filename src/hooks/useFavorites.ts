"use client";

import { useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "casino-koral-favorites";
const CHANGE_EVENT = "casino-koral-favorites-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

function parseFavoriteIds(snapshot: string) {
  try {
    return JSON.parse(snapshot) as number[];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const favoriteIds = useMemo(() => parseFavoriteIds(snapshot), [snapshot]);
  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  function toggleFavorite(id: number) {
    const next = favoriteIds.includes(id)
      ? favoriteIds.filter((favoriteId) => favoriteId !== id)
      : [...favoriteIds, id];

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  return {
    favoriteIds,
    favoriteSet,
    toggleFavorite
  };
}
