import { auth } from "@clerk/nextjs/server";
import AnimeClient from "./AnimeClient";

//fetch anime name for webpage title
export async function generateMetadata({ params }) {
  const { anime } = params;

  // Fetch anime details
  const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);

  if (!response.ok) {
    return {
      title: "Anime Details",
    };
  }

  const res = await response.json();

  return {
    title: res.data?.title || "Anime Details",
  };
}

export default async function AnimeDetails({ params }) {
  const { anime } = params;

  // Fetch data from the API
  const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`);

  // Error handling for failed fetch or bad response
  if (!response.ok) {
    return (
      <div className="flex w-screen justify-center items-center h-screen">
        <p className="text-red-600 text-xl">
          Failed to fetch anime details. Please try again later.
        </p>
      </div>
    );
  }

  const res = await response.json();

  // Return a loading state if the data is not ready yet
  if (!res || !res.data) {
    return (
      <div className="flex w-screen justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Get the current user's ID (you can pass this to the client component)
  const { userId } = auth();

  return <AnimeClient anime={res.data} userId={userId} />;
}
