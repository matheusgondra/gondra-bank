/*
  Warnings:

  - You are about to drop the `checking_accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `investment_accounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('CHECKING', 'INVESTMENT');

-- DropForeignKey
ALTER TABLE "checking_accounts" DROP CONSTRAINT "checking_accounts_holder_id_fkey";

-- DropForeignKey
ALTER TABLE "investment_accounts" DROP CONSTRAINT "investment_accounts_holder_id_fkey";

-- DropTable
DROP TABLE "checking_accounts";

-- DropTable
DROP TABLE "investment_accounts";

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "type" "AccountType" NOT NULL,
    "number" INTEGER NOT NULL,
    "agency" INTEGER NOT NULL,
    "holder_id" INTEGER NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_number_key" ON "accounts"("number");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_holder_id_fkey" FOREIGN KEY ("holder_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
