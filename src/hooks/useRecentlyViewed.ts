"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "casino-koral-recently-viewed";
const CHANGE_EVENT = "casino-koral-recently-viewed-change";
const MAX_ITEMS = 8;

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

function parseIds(snapshot: string) {
  try {
    return JSON.parse(snapshot) as number[];
  } catch {
    return [];
  }
}

export function useRecentlyViewed(gameId: number) {
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const current = stored ? parseIds(stored) : [];
    const next = [gameId, ...current.filter((id) => id !== gameId)].slice(0, MAX_ITEMS);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, [gameId]);
}

export function useRecentlyViewedIds() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return useMemo(() => parseIds(snapshot), [snapshot]);
}
