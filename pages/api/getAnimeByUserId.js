import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Get the userId from query parameters
  const { userId } = req.query;

  // Check if userId is provided
  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    // Fetch all anime records associated with the given userId
    const animeList = await prisma.anime.findMany({
      where: {
        userId: userId, // Filter by userId
      },
    });

    // Return the anime list in the response
    return res.status(200).json(animeList);
  } catch (error) {
    console.error("Error fetching anime for user:", error);
    return res.status(500).json({ message: "Error fetching anime" });
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
}
