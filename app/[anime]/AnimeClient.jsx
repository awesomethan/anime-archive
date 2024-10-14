"use client"; // Mark this as a Client Component

import { useState } from "react";

export default function AnimeClient({ anime, userId }) {
  const [isAdding, setIsAdding] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removeSuccess, setRemoveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
        setRemoveSuccess(false);
      } else {
        if (response.status === 409) {
          // Handle anime already in list
          const data = await response.json();
          setErrorMsg(data.message);
        }
        setAddSuccess(false);
      }
    } catch (error) {
      setErrorMsg("Failed to add anime to list: " + error);
      setAddSuccess(false);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveFromList = async () => {
    setIsRemoving(true);
    try {
      const response = await fetch("/api/removeAnime", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          animeId: anime.mal_id,
          userId,
        }),
      });

      if (response.ok) {
        setRemoveSuccess(true);
        setAddSuccess(false); // Reset add success
      } else {
        if (response.status === 404) {
          const data = await response.json();
          setErrorMsg(data.message);
        }
        setRemoveSuccess(false);
      }
    } catch (error) {
      setErrorMsg("Failed to remove anime from list: " + error);
    } finally {
      setIsRemoving(false);
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

        <div className="flex justify-start space-x-4 mt-5">
          <button
            onClick={handleAddToList}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to My List"}
          </button>

          <button
            onClick={handleRemoveFromList}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            disabled={isRemoving}
          >
            {isRemoving ? "Removing..." : "Remove from My List"}
          </button>
        </div>

        {/* Single message for success or error */}
        <div className="mt-4">
          {(addSuccess || removeSuccess) && (
            <p className="text-green-500">
              {addSuccess
                ? "Successfully added to your list!"
                : "Successfully removed from your list!"}
            </p>
          )}

          {!addSuccess && !removeSuccess && errorMsg && (
            <p className="text-red-500">{errorMsg}</p>
          )}
        </div>
      </div>
    </div>
  );
}
