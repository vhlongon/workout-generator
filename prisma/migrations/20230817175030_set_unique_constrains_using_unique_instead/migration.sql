/*
  Warnings:

  - A unique constraint covering the columns `[name,workoutId]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,userId]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Exercise_name_key";

-- DropIndex
DROP INDEX "Exercise_workoutId_id_idx";

-- DropIndex
DROP INDEX "Workout_name_key";

-- DropIndex
DROP INDEX "Workout_userId_id_idx";

-- DropIndex
DROP INDEX "Workout_userId_name_key";

-- CreateIndex
CREATE INDEX "Exercise_id_workoutId_idx" ON "Exercise"("id", "workoutId");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_workoutId_key" ON "Exercise"("name", "workoutId");

-- CreateIndex
CREATE INDEX "Workout_id_userId_idx" ON "Workout"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_name_userId_key" ON "Workout"("name", "userId");
