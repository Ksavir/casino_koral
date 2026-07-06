import { HomeExperience } from "@/components/HomeExperience";
import { getGames } from "@/lib/games";

export default async function Home() {
  const games = await getGames();

  return <HomeExperience games={games} />;
}
