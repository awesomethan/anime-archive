"use client";
import { useEffect, useState } from "react";

export default function AnimeDetails({ params }) {
  const { anime } = params;
  const [animeData, setAnimeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);
        const res = await data.json();

        if (res.data) {
          setAnimeData(res.data);
        } else {
          console.error("Anime data is undefined:", res);
          // Handle error or redirect to an error page
        }
      } catch (error) {
        console.error("Error fetching anime data:", error);
        // Handle error, show a message, or redirect to an error page
      }
    };

    fetchData();
  }, [anime]);

  if (animeData instanceof Promise) {
    // Handle loading state while the Promise is still pending
    return <p>Loading...</p>;
  }

  if (!animeData) {
    // Handle other error cases
    return <p>Error loading anime data</p>;
  }
  function getProperty(color, property, value) {
    return (
      <p>
        <span className={`${color} underline underline-offset-auto`}>
          {property}:
        </span>
        {" " + value}
      </p>
    );
  }

  return (
    <div className="flex w-screen">
      <div className="flex w-2/5 flex-col">
        <h1 className="pb-4 text-center text-2xl font-bold">
          {animeData.title}
        </h1>
        <div className="flex justify-center">
          <img
            src={animeData.images.jpg.large_image_url}
            alt={animeData.title}
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className="w-3/5 pt-10">
        <p className="pr-48 text-justify">
          <span className="text-rose-600 underline underline-offset-auto">
            Summary:
          </span>
          {" " + animeData.synopsis}
        </p>
        <p>
          <span className="text-orange-400 underline underline-offset-auto">
            Genre(s):
          </span>
          {animeData.genres.map((genre) => (
            <span>{" " + genre.name}</span>
          ))}
        </p>
        {getProperty("text-yellow-300", "Episode(s)", animeData.episodes)}
        {getProperty("text-green-300", "Duration", animeData.duration)}
        {getProperty("text-green-600", "Status", animeData.status)}
        {getProperty("text-blue-300", "Score", animeData.score)}
        {getProperty("text-blue-600", "Rank", animeData.rank)}
        {getProperty("text-indigo-600", "Source", animeData.source)}
        {getProperty("text-purple-400", "Rating", animeData.rating)}
      </div>
    </div>
  );
}
