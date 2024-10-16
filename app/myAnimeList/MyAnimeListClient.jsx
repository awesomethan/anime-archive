"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function MyAnimeListClient({ userId }) {
  const [myAnimeList, setMyAnimeList] = useState([]);

  useEffect(() => {
    async function fetchMyAnime() {
      if (!userId) return;

      try {
        const response = await fetch(`/api/getAnimeByUserId?userId=${userId}`);
        const data = await response.json();
        setMyAnimeList(data);
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      }
    }

    fetchMyAnime();
  }, [userId]);

  return (
    <div>
      <h1>My Anime List</h1>
      <ul>
        {myAnimeList.map((anime) => (
          <Link key={anime.id} href={`/${anime.id}`}>
            <div>{anime.name}</div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
