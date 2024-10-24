"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MyAnimeListClient({ userId }) {
  const [myAnimeList, setMyAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyAnime() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/getAnimeByUserId?userId=${userId}`);
        const data = await response.json();
        const animeDetailsPromises = data.map(async (anime) => {
          try {
            const animeDetailsResponse = await fetch(
              `https://api.jikan.moe/v4/anime/${anime.id}`
            );
            const animeDetails = await animeDetailsResponse.json();

            if (!animeDetails || !animeDetails.data) {
              throw new Error(
                `Failed to fetch details for anime ID: ${anime.id}`
              );
            }

            return {
              ...anime, // Preserve the user-specific data
              ...animeDetails.data, // Add the fetched anime details
            };
          } catch (error) {
            console.error(error.message);
            return anime; // Return existing anime without additional data on error
          }
        });

        // Step 3: Wait for all promises to resolve
        const updatedAnimeList = await Promise.all(animeDetailsPromises);
        setMyAnimeList(updatedAnimeList);
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMyAnime();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex w-screen h-3/5 justify-center items-center">
        <p className="text-2xl font-bold text-white">
          Loading your anime list...
        </p>
      </div>
    );
  }

  return (
    <div className="pt-5 flex flex-col items-center bg-black">
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg tracking-wide">
        My Anime List
      </h1>
      <ul className="space-y-4 w-3/4">
        {myAnimeList.map((anime) => (
          <div key={anime.id} className="">
            <Link href={`/${anime.id}`}>
              <div className="p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:scale-105 hover:shadow-lg transition-all duration-300 w-full shadow-md border border-gray-600">
                {/* Main Title and Info Container */}
                <div className="flex justify-between items-center space-x-6">
                  <h2 className="text-lg font-semibold">{anime.title}</h2>
                  {/* Additional Anime Info */}
                  <div className="w-3/4 flex justify-end space-x-6 text-sm text-gray-400">
                    <p>
                      {anime.genres?.map((genre) => genre.name).join(", ") ||
                        "Unknown Genre"}
                    </p>
                    <p>{anime.episodes || "?"} Episodes</p>
                    <p>Score: {anime.score || "N/A"}</p>
                    <div className="w-1/4 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(anime.score / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
