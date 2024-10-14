import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    return res.status(500).json({ message: "Failed to add anime to list" });
  } finally {
    await prisma.$disconnect();
  }
}
