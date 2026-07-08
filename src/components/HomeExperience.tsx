"use client";

import { useState } from "react";
import type { Game } from "@/types/game";
import { CasinoLobby } from "./CasinoLobby";
import { Footer } from "./Footer";
import { Hero } from "./Hero";

type HomeExperienceProps = {
  games: Game[];
};

export function HomeExperience({ games }: HomeExperienceProps) {
  const [search, setSearch] = useState("");

  return (
    <>
      <Hero games={games} search={search} onSearchChange={setSearch} />
      <CasinoLobby games={games} search={search} />
      <Footer />
    </>
  );
}
