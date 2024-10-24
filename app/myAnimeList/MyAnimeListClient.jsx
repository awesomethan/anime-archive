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
        setMyAnimeList(data);
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
    <div className="pt-5 flex flex-col items-start bg-black px-24">
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg tracking-wide">
        My Anime List
      </h1>
      <ul className="space-y-4">
        {myAnimeList.map((anime) => (
          <div key={anime.id} className="w-fit">
            <Link href={`/${anime.id}`}>
              <div className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 hover:scale-105 hover:shadow-lg transition-all duration-300 w-fit shadow-md border border-gray-600">
                <h2 className="text-lg font-semibold">{anime.name}</h2>
              </div>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
