/*
  Warnings:

  - You are about to drop the `facture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `factureproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `factureproduct` DROP FOREIGN KEY `factureProduct_factId_fkey`;

-- DropForeignKey
ALTER TABLE `factureproduct` DROP FOREIGN KEY `factureProduct_prodId_fkey`;

-- DropTable
DROP TABLE `facture`;

-- DropTable
DROP TABLE `factureproduct`;

-- CreateTable
CREATE TABLE `client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Nom` VARCHAR(30) NOT NULL,
    `prenom` VARCHAR(30) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `ville` VARCHAR(30) NOT NULL,
    `tele` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `client_adresse_key`(`adresse`),
    UNIQUE INDEX `client_tele_key`(`tele`),
    UNIQUE INDEX `client_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
