/*
  Warnings:

  - You are about to alter the column `blindBig` on the `Log` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.
  - You are about to alter the column `blindSmall` on the `Log` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Log` MODIFY `blindBig` INTEGER NULL,
    MODIFY `blindSmall` INTEGER NULL;
