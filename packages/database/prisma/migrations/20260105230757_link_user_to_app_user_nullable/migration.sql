/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `AppUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AppUser" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "AppUser_userId_key" ON "AppUser"("userId");

-- AddForeignKey
ALTER TABLE "AppUser" ADD CONSTRAINT "AppUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
