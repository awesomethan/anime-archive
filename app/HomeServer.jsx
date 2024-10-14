import { currentUser } from "@clerk/nextjs/server";
import HomeClient from "./HomeClient";

// Server Component to fetch current user and pass it down to the client
export default async function HomeServer() {
  const user = await currentUser();
  const username = user?.username;
  const userId = user?.id;
  const welcomeSuffix = username ? `, ${username}` : "";

  return <HomeClient welcomeSuffix={welcomeSuffix} userId={userId} />;
}
