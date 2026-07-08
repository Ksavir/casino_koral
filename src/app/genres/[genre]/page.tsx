import { notFound } from "next/navigation";
import { GameCollection } from "@/components/GameCollection";
import { getGames } from "@/lib/games";

type GenrePageProps = {
  params: Promise<{ genre: string }>;
};

function formatGenreTitle(genreName: string) {
  return /games?$/i.test(genreName) ? genreName : `${genreName} Games`;
}

export default async function GenrePage({ params }: GenrePageProps) {
  const { genre } = await params;
  const genreName = decodeURIComponent(genre);
  const games = await getGames();
  const genreGames = games.filter((game) => game.genre === genreName);

  if (genreGames.length === 0) {
    notFound();
  }

  return (
    <GameCollection
      title={formatGenreTitle(genreName)}
      eyebrow= {`${genreGames.length} games`}
      description={`All ${genreName} titles from the lobby, expanded into a full collection view.`}
      games={genreGames}
    />
  );
}
