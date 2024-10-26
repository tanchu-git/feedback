-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "cognitoId" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "postcode" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "placeId" TEXT,
    "feedbackLink" TEXT,
    "ratingLimit" INTEGER,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "businessId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "tags" TEXT[],
    "message" TEXT,
    "date" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_cognitoId_key" ON "User"("cognitoId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
