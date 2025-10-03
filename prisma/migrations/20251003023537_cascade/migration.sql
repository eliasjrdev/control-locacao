-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Locacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dataDaLocacao" DATETIME NOT NULL,
    "dataDevolucao" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ativo',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clienteId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    CONSTRAINT "Locacao_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Locacao_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Locacao" ("clienteId", "createdAt", "dataDaLocacao", "dataDevolucao", "id", "itemId", "status") SELECT "clienteId", "createdAt", "dataDaLocacao", "dataDevolucao", "id", "itemId", "status" FROM "Locacao";
DROP TABLE "Locacao";
ALTER TABLE "new_Locacao" RENAME TO "Locacao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
