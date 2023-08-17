/*
  Warnings:

  - A unique constraint covering the columns `[workoutId]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exercise_workoutId_key" ON "Exercise"("workoutId");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_userId_key" ON "Workout"("userId");
