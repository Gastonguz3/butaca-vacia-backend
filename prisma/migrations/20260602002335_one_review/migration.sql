/*
  Warnings:

  - A unique constraint covering the columns `[userId,tmdbId,mediaType]` on the table `comentarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "comentarios_userId_tmdbId_mediaType_key" ON "comentarios"("userId", "tmdbId", "mediaType");
