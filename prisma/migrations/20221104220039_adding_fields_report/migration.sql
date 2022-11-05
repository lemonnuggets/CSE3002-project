/*
  Warnings:

  - Added the required column `endDate` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Appointments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'waiting for review',
    "timing" DATETIME NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    CONSTRAINT "Appointments_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Appointments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Appointments" ("doctorId", "id", "patientId", "timing") SELECT "doctorId", "id", "patientId", "timing" FROM "Appointments";
DROP TABLE "Appointments";
ALTER TABLE "new_Appointments" RENAME TO "Appointments";
CREATE TABLE "new_LabResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "for" TEXT,
    "result" TEXT,
    "status" TEXT NOT NULL DEFAULT 'processing',
    "labName" TEXT,
    "labLocation" TEXT,
    "patientId" TEXT NOT NULL,
    CONSTRAINT "LabResult_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LabResult" ("for", "id", "patientId", "result", "status") SELECT "for", "id", "patientId", "result", "status" FROM "LabResult";
DROP TABLE "LabResult";
ALTER TABLE "new_LabResult" RENAME TO "LabResult";
CREATE TABLE "new_Prescription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "for" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    CONSTRAINT "Prescription_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Prescription_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Prescription" ("details", "doctorId", "for", "id", "name", "patientId") SELECT "details", "doctorId", "for", "id", "name", "patientId" FROM "Prescription";
DROP TABLE "Prescription";
ALTER TABLE "new_Prescription" RENAME TO "Prescription";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
