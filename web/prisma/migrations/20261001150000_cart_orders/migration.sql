ALTER TYPE "ProductKind" ADD VALUE 'CART';

CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "OrderItem_orderId_templateId_key" ON "OrderItem"("orderId", "templateId");
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
