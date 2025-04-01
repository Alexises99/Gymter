/*
  Warnings:

  - You are about to drop the `exercises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `goals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `routine_exercises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `routines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "goals" DROP CONSTRAINT "goals_user_id_fkey";

-- DropForeignKey
ALTER TABLE "routine_exercises" DROP CONSTRAINT "routine_exercises_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "routine_exercises" DROP CONSTRAINT "routine_exercises_routine_id_fkey";

-- DropForeignKey
ALTER TABLE "routines" DROP CONSTRAINT "routines_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sets" DROP CONSTRAINT "sets_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "sets" DROP CONSTRAINT "sets_user_id_fkey";

-- DropTable
DROP TABLE "exercises";

-- DropTable
DROP TABLE "goals";

-- DropTable
DROP TABLE "routine_exercises";

-- DropTable
DROP TABLE "routines";

-- DropTable
DROP TABLE "sets";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" VARCHAR(100) NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "exerciseId" INTEGER,
    "targetWeight" DECIMAL(5,2),
    "targetSets" INTEGER,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutineExercise" (
    "routineId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "RoutineExercise_pkey" PRIMARY KEY ("routineId","exerciseId")
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "category" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "exerciseId" INTEGER,
    "weight" DECIMAL(5,2) NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "feeling" VARCHAR(50),
    "performedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "height" DECIMAL(5,2),
    "weight" DECIMAL(5,2),
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteRoutine" (
    "userId" INTEGER NOT NULL,
    "routineId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteRoutine_pkey" PRIMARY KEY ("userId","routineId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RoutineExercise" ADD CONSTRAINT "RoutineExercise_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "FavoriteRoutine" ADD CONSTRAINT "FavoriteRoutine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRoutine" ADD CONSTRAINT "FavoriteRoutine_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
