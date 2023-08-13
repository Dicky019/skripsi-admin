-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'driver', 'passenger');

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "nokk" TEXT NOT NULL,
    "noHp" TEXT NOT NULL,
    "noPlatMobil" TEXT NOT NULL,
    "maxPenumpang" INTEGER NOT NULL,
    "fotoKtp" TEXT NOT NULL,
    "fotoMobil" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rute" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Rute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "latAwal" TEXT NOT NULL,
    "longAwal" TEXT NOT NULL,
    "latAkhir" TEXT NOT NULL,
    "longAkhir" TEXT NOT NULL,
    "ruteId" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "driverId" TEXT,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Location_ruteId_idx" ON "Location"("ruteId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_driverId_key" ON "User"("driverId");
