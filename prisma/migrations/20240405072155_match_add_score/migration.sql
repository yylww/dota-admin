-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "awayScore" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "homeScore" INTEGER NOT NULL DEFAULT 0;
