-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "items" JSONB;

-- CreateTable
CREATE TABLE "Item" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "cname" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_name_key" ON "Item"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Item_cname_key" ON "Item"("cname");
