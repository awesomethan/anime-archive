"use client"; // Mark this as a Client Component

import { useState, useEffect } from "react";
import AnimeAPI from "./AnimeAPI";

export default function AnimeClient({ anime, userId }) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const imageURL = anime.images?.jpg?.large_image_url;

  useEffect(() => {
    const img = new Image();
    img.src = imageURL;
    img.onload = () => setIsImageLoading(false);
  }, [imageURL]);

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
    <div className="flex w-screen pb-10 pt-3">
      {/* Left Section: Title and Image */}
      <div className="flex w-2/5 flex-col justify-center">
        <h1 className="pb-4 text-center text-2xl font-bold">
          {anime.title || "Title not available"}
        </h1>
        <div className="flex justify-center">
          <div className="relative w-1/2 aspect-w-14 aspect-h-9">
            {isImageLoading && (
              <img
                src="/loading-spinner.gif" // Your loading spinner or placeholder image
                alt="Loading"
                className="absolute inset-0 rounded-lg shadow-lg object-cover"
              />
            )}
            {!isImageLoading && (
              <img
                src={imageURL}
                alt={anime.title || "Anime image"}
                className="absolute inset-0 rounded-lg shadow-lg transition-opacity duration-500"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex w-3/5 flex-col justify-center">
        {/* Right Section: Anime Details */}
        <div className="text-white">
          <p className="pr-32 text-justify pb-4">
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
        {anime && userId && <AnimeAPI anime={anime} userId={userId} />}
      </div>
    </div>
  );
}
