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
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
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
    if (
      error.code === "P1001" ||
      error.message.includes("502") ||
      error.message.includes("504")
    ) {
      return res.status(503).json({
        message: "Server is temporarily down, please try again later",
      });
    }
    return res.status(500).json({ message: "Failed to add anime to list" });
  } finally {
    await prisma.$disconnect();
  }
}
