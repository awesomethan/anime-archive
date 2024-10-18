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
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { animeId, userId } = req.body;

  try {
    // Check if the anime exists in the user's list
    const existingAnime = await prisma.anime.findFirst({
      where: {
        userId: userId,
        id: animeId,
      },
    });

    if (!existingAnime) {
      return res.status(404).json({ message: "Anime not found in list" });
    }

    // Remove the anime from the user's list
    await prisma.anime.delete({
      where: {
        id_userId: {
          // Composite key: assuming id and userId are composite unique key
          id: animeId,
          userId: userId,
        },
      },
    });

    return res.status(200).json({ message: "Anime removed from list" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to remove anime from list" });
  } finally {
    await prisma.$disconnect();
  }
}
