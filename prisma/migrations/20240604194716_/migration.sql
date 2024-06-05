-- CreateEnum
CREATE TYPE "CarType" AS ENUM ('SEDAN', 'SUV', 'HATCHBACK', 'COUPE', 'CONVERTIBLE', 'LUXURY', 'TRUCK');

-- CreateEnum
CREATE TYPE "RegSpecs" AS ENUM ('GCC', 'AMERICAN', 'EUROPEAN', 'JAPANESE', 'CHINESE', 'CANADIAN');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'DEALER', 'ADMIN');

-- CreateEnum
CREATE TYPE "City" AS ENUM ('ABU_DHABI', 'SHARJAH', 'DUBAI', 'AJMAN', 'AL_AIN', 'RIYADH', 'JEDDAH', 'DOHA');

-- CreateEnum
CREATE TYPE "Make" AS ENUM ('TOYOTA', 'MITSUBISHI', 'NISSAN', 'HYUNDAI', 'FORD', 'HONDA', 'CHEVROLET', 'VOLKSWAGEN', 'JEEP', 'KIA', 'JETOUR', 'LOTUS', 'LAND_ROVER', 'LINCOLN', 'LEXUS', 'MAXUS', 'MASERATI', 'MAZDA', 'MCLAREN', 'MINI', 'OPEL', 'DODGE', 'DEVEL', 'CHANGAN', 'CHRYSLER', 'ASTON_MARTIN', 'CADILLAC', 'BORGWARD', 'BYD', 'ABARTH', 'ALFA_ROMEO', 'GMC', 'GENESIS', 'ISUZU', 'INFINITI', 'HAVAL', 'FOTON', 'PEUGEOT');

-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "type" "CarType" NOT NULL,
    "year" INTEGER NOT NULL,
    "regSpecs" "RegSpecs" NOT NULL,
    "make" "Make" NOT NULL,
    "mileage" INTEGER NOT NULL,
    "city" "City" NOT NULL,
    "contactPhone" TEXT,
    "capacity" INTEGER NOT NULL,
    "serviceHistory" BOOLEAN NOT NULL DEFAULT false,
    "accidentHistory" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postedById" TEXT NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "carId" TEXT NOT NULL,

    CONSTRAINT "CarImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "profileImage" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DealerInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "website" TEXT,
    "established" INTEGER,

    CONSTRAINT "DealerInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Wishlist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Car_make_idx" ON "Car"("make");

-- CreateIndex
CREATE INDEX "Car_year_price_idx" ON "Car"("year", "price");

-- CreateIndex
CREATE INDEX "CarImage_carId_idx" ON "CarImage"("carId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DealerInfo_userId_key" ON "DealerInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_Wishlist_AB_unique" ON "_Wishlist"("A", "B");

-- CreateIndex
CREATE INDEX "_Wishlist_B_index" ON "_Wishlist"("B");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarImage" ADD CONSTRAINT "CarImage_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DealerInfo" ADD CONSTRAINT "DealerInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Wishlist" ADD CONSTRAINT "_Wishlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Wishlist" ADD CONSTRAINT "_Wishlist_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
