import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*"); // Update to specific origin if needed
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Authorization, Content-Type, Origin"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { animeId, animeName, userId } = req.body;

  try {
    // Check if the anime already exists in the user's list
    const existingAnime = await prisma.anime.findFirst({
      where: {
        userId: userId,
        name: animeName,
      },
    });

    if (existingAnime) {
      return res.status(409).json({ message: "Anime already in list" });
    }

    // Add the anime to the user's list
    const newAnime = await prisma.anime.create({
      data: {
        id: animeId,
        name: animeName,
        userId: userId,
      },
    });

    return res
      .status(200)
      .json({ message: "Anime added to list", anime: newAnime });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add anime to list" });
  } finally {
    await prisma.$disconnect();
  }
}
