"use client"; // Mark this as a Client Component

import { useState } from "react";

export default function AnimeClient({ anime, userId }) {
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle adding the anime to the user's list
  const handleAddToList = async () => {
    setIsAdding(true);
    try {
      const response = await fetch("/api/addAnime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          animeId: anime.mal_id,
          animeName: anime.title,
          userId,
        }),
      });

      if (response.ok) {
        setAddSuccess(true);
      } else {
        if (response.status === 409) {
          // Handle anime already in list
          const data = await response.json();
          setErrorMsg(data.message);
        }
        setAddSuccess(false);
      }
    } catch (error) {
      console.error("Failed to add anime to list:", error);
      setAddSuccess(false);
    } finally {
      setIsAdding(false);
    }
  };

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

      {/* Right Section: Anime Details */}
      <div className="w-3/5 pl-10 pt-10 text-white">
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

        <button
          onClick={handleAddToList}
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isAdding}
        >
          {isAdding ? "Adding..." : "Add to My List"}
        </button>
        {addSuccess && (
          <p className="text-green-500 mt-2">
            Successfully added to your list!
          </p>
        )}
        {!addSuccess && !isAdding && (
          <p className="text-red-500 mt-2">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}
