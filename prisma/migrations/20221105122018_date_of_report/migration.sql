-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LabResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "submittedDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "for" TEXT,
    "result" TEXT,
    "status" TEXT NOT NULL DEFAULT 'processing',
    "labName" TEXT,
    "labLocation" TEXT,
    "patientId" TEXT NOT NULL,
    CONSTRAINT "LabResult_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LabResult" ("for", "id", "labLocation", "labName", "patientId", "result", "status") SELECT "for", "id", "labLocation", "labName", "patientId", "result", "status" FROM "LabResult";
DROP TABLE "LabResult";
ALTER TABLE "new_LabResult" RENAME TO "LabResult";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
