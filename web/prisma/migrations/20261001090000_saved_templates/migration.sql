CREATE TABLE "SavedTemplate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedTemplate_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SavedTemplate_userId_templateId_key" ON "SavedTemplate"("userId", "templateId");
CREATE INDEX "SavedTemplate_userId_createdAt_idx" ON "SavedTemplate"("userId", "createdAt");

ALTER TABLE "SavedTemplate" ADD CONSTRAINT "SavedTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
