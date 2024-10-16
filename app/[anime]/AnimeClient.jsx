"use client"; // Mark this as a Client Component

import AnimeAPI from "./AnimeAPI";

export default function AnimeClient({ anime, userId }) {
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
          {anime.title || "Title not available"}
        </h1>
        <div className="flex justify-center">
          <img
            src={anime.images?.jpg?.large_image_url || "/placeholder.jpg"}
            alt={anime.title || "Anime image"}
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
      <div className="flex w-3/5 flex-col">
        {/* Right Section: Anime Details */}
        <div className="pr-10 pt-10 text-white">
          <p className="pr-48 text-justify pb-4">
            <span className="text-cyan-400 underline underline-offset-auto">
              Summary:
            </span>
            {" " + (anime.synopsis || "Synopsis not available")}
          </p>

          <p className="pb-4">
            <span className="text-lime-400 underline underline-offset-auto">
              Genre(s):
            </span>
            {anime.genres && anime.genres.length > 0
              ? anime.genres.map((genre) => (
                  <span key={genre.mal_id}>{" " + genre.name}</span>
                ))
              : " Genre data not available"}
          </p>

          {getProperty("text-yellow-400", "Episode(s)", anime.episodes)}
          {getProperty("text-orange-400", "Duration", anime.duration)}
          {getProperty("text-pink-400", "Status", anime.status)}
          {getProperty("text-blue-400", "Score", anime.score)}
          {getProperty("text-gray-400", "Rank", anime.rank)}
          {getProperty("text-purple-400", "Source", anime.source)}
          {getProperty("text-fuchsia-400", "Rating", anime.rating)}
        </div>

        <AnimeAPI anime={anime} userId={userId} />
      </div>
    </div>
  );
}
