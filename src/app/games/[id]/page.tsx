import { Calendar, ExternalLink, Gamepad2, Monitor, UserRoundCog } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { RecentlyViewedMarker } from "@/components/RecentlyViewedMarker";
import { getGameDetails } from "@/lib/games";

type GameDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function GameDetailsPage({ params }: GameDetailsPageProps) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const game = await getGameDetails(id);
  const stats = [
    ["Genre", game.genre, Gamepad2],
    ["Platform", game.platform, Monitor],
    ["Publisher", game.publisher, ExternalLink],
    ["Developer", game.developer, UserRoundCog],
    ["Release date", game.release_date, Calendar]
  ];

  return (
    <main className="min-h-screen">
      <RecentlyViewedMarker gameId={game.id} />
      <section className="relative isolate overflow-hidden px-5 pb-12 pt-6 sm:px-8 lg:px-12">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${game.thumbnail})` }}
        />
        <div className="theme-game-detail-shade absolute inset-0 -z-10" />

        <Link href="/">
          <Button variant="ghost">Back to lobby</Button>
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="animate-rise">
            <h1 className="font-display text-6xl font-bold leading-[0.88] text-chalk light-readable-text sm:text-7xl lg:text-8xl">
              {game.title}
            </h1>
            <div className="theme-readable-panel mt-6 aspect-[16/10] max-w-3xl overflow-y-auto rounded-lg border border-chalk/10 bg-ink/50 p-5 text-lg leading-8 text-chalk/74 shadow-casino backdrop-blur">
              <p className="text-justify">{game.description}</p>
            </div>
            <a href={game.game_url} target="_blank" rel="noreferrer">
              <Button className="mt-7">
                Play on official site
                <ExternalLink className="size-4" />
              </Button>
            </a>
          </div>
          <div className="relative aspect-[14/10] overflow-hidden rounded-lg border border-brass/30 bg-ink shadow-casino">
            <Image src={game.thumbnail} alt={`${game.title} artwork`} fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-5 lg:px-12">
        {stats.map(([label, value, Icon]) => (
          <div key={label as string} className="rounded-lg border border-chalk/10 bg-ink/65 p-4 shadow-casino">
            <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brass">
              <Icon className="size-4" />
              {label as string}
            </div>
            <p className="text-sm font-bold text-chalk">{value as string}</p>
          </div>
        ))}
      </section>

      {game.screenshots && game.screenshots.length > 0 ? (
        <section className="px-5 pb-12 sm:px-8 lg:px-12">
          <h2 className="mb-5 font-display text-4xl font-bold text-chalk">Screenshots</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {game.screenshots.slice(0, 3).map((screenshot) => (
              <div key={screenshot.id} className="relative aspect-video overflow-hidden rounded-lg border border-chalk/10 bg-ink shadow-casino">
                <Image src={screenshot.image} alt={`${game.title} screenshot`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {game.minimum_system_requirements ? (
        <section className="px-5 pb-14 sm:px-8 lg:px-12">
          <div className="rounded-lg border border-chalk/10 bg-chalk/[0.06] p-5">
            <h2 className="mb-5 font-display text-4xl font-bold text-chalk">Minimum system requirements</h2>
            <dl className="grid gap-4 md:grid-cols-2">
              {Object.entries(game.minimum_system_requirements).map(([label, value]) => (
                <div key={label} className="border-t border-chalk/10 pt-4">
                  <dt className="text-xs font-black uppercase tracking-[0.2em] text-brass">{label}</dt>
                  <dd className="mt-1 text-chalk/78">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}
    </main>
  );
}
