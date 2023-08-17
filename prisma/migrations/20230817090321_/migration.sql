/*
  Warnings:

  - You are about to drop the column `isFavourite` on the `Exercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "isFavourite";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "isFavourite" BOOL DEFAULT false;
