-- CreateTable
CREATE TABLE "transaction_registers" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_registers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transaction_registers" ADD CONSTRAINT "transaction_registers_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction_registers" ADD CONSTRAINT "transaction_registers_toId_fkey" FOREIGN KEY ("toId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
