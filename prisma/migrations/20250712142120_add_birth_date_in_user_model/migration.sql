/*
  Warnings:

  - Added the required column `birth_date` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL;
