-- AlterTable
ALTER TABLE "TrendingTech" ADD COLUMN "featuredIndex" INTEGER;

-- CreateIndex
CREATE INDEX "TrendingTech_featuredIndex_idx" ON "TrendingTech"("featuredIndex");
