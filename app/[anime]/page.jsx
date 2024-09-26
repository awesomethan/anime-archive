export default async function AnimeDetails({ params }) {
  const { anime } = params;

  // Fetch data from the API
  const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);

  // Error handling for failed fetch or bad response
  if (!response.ok) {
    return (
      <div className="flex w-screen justify-center items-center h-screen">
        <p className="text-red-600 text-xl">
          Failed to fetch anime details. Please try again later.
        </p>
      </div>
    );
  }

  const res = await response.json();

  // Return a loading state if the data is not ready yet
  if (!res || !res.data) {
    return (
      <div className="flex w-screen justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Utility function to display properties
  function getProperty(color, property, value) {
    return (
      <p>
        <span className={`${color} underline underline-offset-auto`}>
          {property}:
        </span>
        {" " + (value || "N/A")}
      </p>
    );
  }

  return (
    <div className="flex w-screen p-10">
      {/* Left Section: Title and Image */}
      <div className="flex w-2/5 flex-col">
        <h1 className="pb-4 text-center text-2xl font-bold">
          {res.data.title || "Title not available"}
        </h1>
        <div className="flex justify-center">
          <img
            src={res.data.images?.jpg?.large_image_url || "/placeholder.jpg"}
            alt={res.data.title || "Anime image"}
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Right Section: Anime Details */}
      <div className="w-3/5 pl-10 pt-10 text-white">
        <p className="pr-48 text-justify pb-4">
          <span className="text-cyan-400 underline underline-offset-auto">
            Summary:
          </span>
          {" " + (res.data.synopsis || "Synopsis not available")}
        </p>

        <p className="pb-4">
          <span className="text-lime-400 underline underline-offset-auto">
            Genre(s):
          </span>
          {res.data.genres && res.data.genres.length > 0
            ? res.data.genres.map((genre) => (
                <span key={genre.mal_id}>{" " + genre.name}</span>
              ))
            : " Genre data not available"}
        </p>

        {getProperty("text-yellow-400", "Episode(s)", res.data.episodes)}
        {getProperty("text-orange-400", "Duration", res.data.duration)}
        {getProperty("text-pink-400", "Status", res.data.status)}
        {getProperty("text-blue-400", "Score", res.data.score)}
        {getProperty("text-gray-400", "Rank", res.data.rank)}
        {getProperty("text-purple-400", "Source", res.data.source)}
        {getProperty("text-fuchsia-400", "Rating", res.data.rating)}
      </div>
    </div>
  );
}
