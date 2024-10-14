-- CreateTable
CREATE TABLE "Anime" (
    "id" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Anime_pkey" PRIMARY KEY ("id","userId")
);
