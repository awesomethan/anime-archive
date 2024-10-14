import { auth } from "@clerk/nextjs/server";
import MyAnimeListClient from "./MyAnimeListClient";

export default async function MyList() {
  const { userId } = auth();

  // Pass data to the client component
  return <MyAnimeListClient userId={userId} />;
}