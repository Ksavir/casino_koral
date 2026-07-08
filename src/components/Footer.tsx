import { Crown, Dice5 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-chalk/10 bg-ink/88 px-5 py-8 sm:px-8 lg:px-12">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full border border-brass/45 bg-brass/10 text-brass">
              <Dice5 className="size-5" />
            </div>
            <span className="font-display text-2xl font-bold text-chalk">Casino Koral</span>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-chalk/62">
            Free-to-play games lobby with genre sliders, favorites, search, filters, and game details.
          </p>
        </div>

        <a
          href="https://www.freetogame.com/"
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex w-fit items-center gap-2 rounded-full border border-chalk/10 bg-chalk/[0.06] px-4 py-2 text-sm font-bold text-chalk/76 transition hover:border-brass/60 hover:text-brass"
        >
          <Crown className="size-4 text-brass" />
          Powered by FreeToGame
        </a>
      </div>
    </footer>
  );
}
