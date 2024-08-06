/*
  Warnings:

  - A unique constraint covering the columns `[name,ownerId]` on the table `Bankroll` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Bankroll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bankroll` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Bankroll_name_ownerId_key` ON `Bankroll`(`name`, `ownerId`);
