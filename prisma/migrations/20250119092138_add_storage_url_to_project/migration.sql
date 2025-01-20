/*
  Warnings:

  - Added the required column `storage_url` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "storage_url" TEXT NOT NULL;
