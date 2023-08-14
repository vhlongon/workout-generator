/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Exercise_workoutId_id_idx" ON "Exercise"("workoutId", "id");

-- CreateIndex
CREATE INDEX "Workout_userId_id_idx" ON "Workout"("userId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Workout_userId_name_key" ON "Workout"("userId", "name");
