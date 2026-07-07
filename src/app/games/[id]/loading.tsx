export default function GameDetailsLoading() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mb-8 h-11 w-36 animate-pulse rounded-md bg-chalk/10" />
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="h-20 animate-pulse rounded-lg bg-chalk/10" />
          <div className="mt-4 h-44 animate-pulse rounded-lg bg-chalk/10" />
        </div>
        <div className="aspect-video animate-pulse rounded-lg bg-chalk/10" />
      </div>
    </main>
  );
}
