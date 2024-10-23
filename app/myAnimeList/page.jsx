import { auth } from "@clerk/nextjs/server";
import MyAnimeListClient from "./MyAnimeListClient";

export const metadata = {
  title: "My Anime List",
};

export default async function myAnimeList() {
  const { userId } = auth();

  // Pass data to the client component
  return <MyAnimeListClient userId={userId} />;
}
