"use client";

import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

export function RecentlyViewedMarker({ gameId }: { gameId: number }) {
  useRecentlyViewed(gameId);
  return null;
}
