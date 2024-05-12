-- AlterTable
ALTER TABLE "Stage" ADD COLUMN     "rule_en" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title_en" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "description_en" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title_en" TEXT NOT NULL DEFAULT '';
