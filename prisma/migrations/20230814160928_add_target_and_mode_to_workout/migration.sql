/*
  Warnings:

  - Added the required column `mode` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "mode" "Mode" NOT NULL;
ALTER TABLE "Workout" ADD COLUMN     "target" "Target" NOT NULL;
