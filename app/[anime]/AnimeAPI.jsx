"use client";

import { useState } from "react";

export default function AnimeAPI({ anime, userId }) {
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
          userId: userId,
        }),
      });

      if (response.ok) {
        setAddSuccess(true);
        setRemoveSuccess(false);
      } else {
        const data = await response.json();
        setErrorMsg(data.message);
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
        const data = await response.json();
        setErrorMsg(data.message);
        setRemoveSuccess(false);
      }
    } catch (error) {
      setErrorMsg("Failed to remove anime from list: " + error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div>
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
  );
}
