/*
  Warnings:

  - Added the required column `titleShow` to the `comentarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comentarios" ADD COLUMN     "titleShow" TEXT NOT NULL;
