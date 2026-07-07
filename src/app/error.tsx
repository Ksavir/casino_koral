"use client";


import { RotateCcw } from "lucide-react";
import { Button } from "@/components/Button";


export default function Error({
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <div className="max-w-xl rounded-lg border border-ember/30 bg-ink/70 p-8 shadow-casino">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-ember">API error</p>
        <h1 className="mt-2 font-display text-5xl font-bold text-chalk">The lobby could not open</h1>
        <p className="mt-4 text-chalk/70">
          FreeToGame did not respond successfully. Please try again in a moment.
        </p>
        <Button className="mt-6" onClick={() => reset()}>
          <RotateCcw className="size-4" />
          Retry
        </Button>
      </div>
    </main>
  );
}
