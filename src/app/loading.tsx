export default function Loading() {
  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mb-10 h-80 animate-pulse rounded-lg border border-chalk/10 bg-chalk/10" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-72 animate-pulse rounded-lg border border-chalk/10 bg-chalk/10" />
        ))}
      </div>
    </main>
  );
}
