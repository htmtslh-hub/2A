-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('PAYOS', 'PADDLE');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paddleTxnId" TEXT,
ADD COLUMN     "provider" "PaymentProvider" NOT NULL DEFAULT 'PAYOS',
ALTER COLUMN "payosOrderCode" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_paddleTxnId_key" ON "Order"("paddleTxnId");

