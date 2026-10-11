-- Additive: retain all historical product kinds and permanent purchases.
ALTER TYPE "ProductKind" ADD VALUE 'PRO';
ALTER TYPE "ProductKind" ADD VALUE 'ULTRA';

CREATE TABLE "Membership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "plan" "ProductKind" NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Membership_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Membership_period_check" CHECK ("expiresAt" > "startsAt"),
    CONSTRAINT "Membership_plan_check" CHECK ("plan"::text IN ('PRO', 'ULTRA'))
);
CREATE UNIQUE INDEX "Membership_orderId_key" ON "Membership"("orderId");
CREATE INDEX "Membership_userId_expiresAt_idx" ON "Membership"("userId", "expiresAt");
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
