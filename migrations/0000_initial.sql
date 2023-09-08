-- Migration number: 0000 	 2023-07-20T22:35:18.053Z

-- CreateTable

CREATE TABLE
    "Pokedex" (
        "id" INTEGER NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "types" TEXT NOT NULL,
        "abilities" TEXT NOT NULL
    );
