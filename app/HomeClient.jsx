"use client";

import React, { useState } from "react";
import Anime from "./Anime";

export default function HomeClient({ welcomeSuffix }) {
  const [search, setSearch] = useState("");
  const [animeList, setAnimeList] = useState();

  const recommendedAnime = [
    {
      title: "Kimetsu no Yaiba",
      imageURL: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
      id: 38000,
    },
    {
      title: "Death Note",
      imageURL: "https://cdn.myanimelist.net/images/anime/9/9453l.jpg",
      id: 1535,
    },
    {
      title: "Shingeki no Kyojin",
      imageURL: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
      id: 16498,
    },
    {
      title: "Blue Lock",
      imageURL: "https://cdn.myanimelist.net/images/anime/1258/126929l.jpg",
      id: 49596,
    },
    {
      title: "Koe no Katachi",
      imageURL: "https://cdn.myanimelist.net/images/anime/1122/96435l.jpg",
      id: 28851,
    },
    {
      title: "Tenki no Ko",
      imageURL: "https://cdn.myanimelist.net/images/anime/1880/101146l.jpg",
      id: 38826,
    },
    {
      title: "Lycoris Recoil",
      imageURL: "https://cdn.myanimelist.net/images/anime/1392/124401l.jpg",
      id: 50709,
    },
    {
      title: "Pokemon XY",
      imageURL: "https://cdn.myanimelist.net/images/anime/12/54549l.jpg",
      id: 19291,
    },
    {
      title: "Spy x Family",
      imageURL: "https://cdn.myanimelist.net/images/anime/1441/122795l.jpg",
      id: 50265,
    },
    {
      title: "Jujutsu Kaisen",
      imageURL: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
      id: 40748,
    },
    {
      title: "Tomodachi Game",
      imageURL: "https://cdn.myanimelist.net/images/anime/1247/121345l.jpg",
      id: 50273,
    },
    {
      title: "Charlotte",
      imageURL: "https://cdn.myanimelist.net/images/anime/12/74683l.jpg",
      id: 28999,
    },
    {
      title: "Yakusoku no Neverland",
      imageURL: "https://cdn.myanimelist.net/images/anime/1830/118780l.jpg",
      id: 37779,
    },
    {
      title: "Horimiya",
      imageURL: "https://cdn.myanimelist.net/images/anime/1695/111486l.jpg",
      id: 42897,
    },
    {
      title: "Bocchi the Rock",
      imageURL: "https://cdn.myanimelist.net/images/anime/1448/127956l.jpg",
      id: 47917,
    },
  ];

  async function getAnimeList() {
    const data = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&limit=20`
    );
    const res = await data.json();
    const filteredAnime = res.data.filter(
      (anime) =>
        !anime.rating?.toLowerCase().includes("hentai") &&
        !anime.rating?.toLowerCase().includes("nudity")
    );

    setAnimeList(filteredAnime);
  }

  function showSearchResults() {
    if (animeList) {
      if (animeList.length > 0)
        return <p className="pb-5 text-3xl font-bold">Search Results</p>;
      else
        return (
          <p className="pb-10 text-xl font-bold">
            No anime found. Please enter a valid anime name.
          </p>
        );
    }
  }

  return (
    <main className="w-screen">
      <h1 className="flex justify-center py-10 text-3xl font-bold">
        Welcome{welcomeSuffix}!👋
      </h1>
      <div className="flex justify-center w-full">
        <div className="flex w-2/3">
          <input
            type="search"
            placeholder="Search for an anime"
            className="w-3/4 rounded-lg border-2 border-gray-500 px-3"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getAnimeList();
              }
            }}
          />
          <input
            type="button"
            value="Search!"
            className="mx-5 w-1/4 rounded-lg border-2 border-gray-500 py-5 text-2xl font-semibold transition duration-300 hover:cursor-pointer hover:bg-white hover:text-black"
            onClick={getAnimeList}
          />
        </div>
      </div>

      <div className="p-10">
        {showSearchResults()}
        <div className="grid grid-cols-5 gap-16 pb-10">
          {animeList?.map((anime) => (
            <Anime
              key={anime.mal_id}
              title={anime.title}
              imageURL={anime.images.jpg.image_url}
              id={anime.mal_id}
            ></Anime>
          ))}
        </div>

        <p className="pb-5 text-3xl font-bold">Recommended Anime</p>
        <div className="grid grid-cols-5 gap-16">
          {recommendedAnime.map((anime) => (
            <Anime
              key={anime.id}
              title={anime.title}
              imageURL={anime.imageURL}
              id={anime.id}
            ></Anime>
          ))}
        </div>
      </div>
    </main>
  );
}
