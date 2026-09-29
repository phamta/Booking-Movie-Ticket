export default function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to MovieTickets</h1>
      <p className="text-lg mb-8">Book your favorite movies at the best cinemas.</p>
      <a href="/movies" className="px-6 py-3 bg-primary text-white rounded-lg">Browse Movies</a>
    </div>
  );
}