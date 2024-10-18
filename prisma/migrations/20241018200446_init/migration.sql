-- CreateTable
CREATE TABLE "Anime" (
    "id" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id", "userId")
);
