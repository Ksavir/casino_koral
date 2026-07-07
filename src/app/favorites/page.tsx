import { FavoritesCollection } from "@/components/FavoritesCollection";
import { getGames } from "@/lib/games";

export default async function FavoritesPage() {
  const games = await getGames();

  return <FavoritesCollection games={games} />;
}
