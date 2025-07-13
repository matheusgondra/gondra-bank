-- CreateTable
CREATE TABLE "checking_accounts" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "agency" INTEGER NOT NULL,
    "holder_id" INTEGER NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checking_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "checking_accounts_number_key" ON "checking_accounts"("number");

-- CreateIndex
CREATE UNIQUE INDEX "checking_accounts_holder_id_key" ON "checking_accounts"("holder_id");

-- AddForeignKey
ALTER TABLE "checking_accounts" ADD CONSTRAINT "checking_accounts_holder_id_fkey" FOREIGN KEY ("holder_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
