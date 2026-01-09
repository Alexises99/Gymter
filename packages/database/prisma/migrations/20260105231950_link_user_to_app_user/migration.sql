/*
  Warnings:

  - Made the column `userId` on table `AppUser` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AppUser" ALTER COLUMN "userId" SET NOT NULL;
