import Link from "next/link";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <div className="max-w-lg">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-brass">404 table closed</p>
        <h1 className="mt-2 font-display text-5xl font-bold text-chalk">Game not found</h1>
        <Link href="/">
          <Button className="mt-6">Back to lobby</Button>
        </Link>
      </div>
    </main>
  );
}
