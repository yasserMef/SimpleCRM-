-- CreateTable
CREATE TABLE `entreprise` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_entreprise` VARCHAR(50) NOT NULL,
    `siege_social` VARCHAR(191) NOT NULL,
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `identifiant_fiscal` BIGINT NOT NULL,
    `capital` DOUBLE NOT NULL,
    `nombre_employes` INTEGER NOT NULL,
    `ville` VARCHAR(50) NOT NULL,
    `responsable` VARCHAR(50) NOT NULL,
    `tele` BIGINT NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `entreprise_nom_entreprise_key`(`nom_entreprise`),
    UNIQUE INDEX `entreprise_siege_social_key`(`siege_social`),
    UNIQUE INDEX `entreprise_identifiant_fiscal_key`(`identifiant_fiscal`),
    UNIQUE INDEX `entreprise_tele_key`(`tele`),
    UNIQUE INDEX `entreprise_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantite` INTEGER NOT NULL,
    `prix_achat` DOUBLE NOT NULL,
    `prix_vente` DOUBLE NOT NULL,
    `taux_marge` DOUBLE NOT NULL,
    `dimension` INTEGER NOT NULL,
    `color` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factureProduct` (
    `prodId` INTEGER NOT NULL,
    `factId` INTEGER NOT NULL,
    `qauntite` INTEGER NOT NULL,

    PRIMARY KEY (`prodId`, `factId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `factureProduct` ADD CONSTRAINT `factureProduct_prodId_fkey` FOREIGN KEY (`prodId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `factureProduct` ADD CONSTRAINT `factureProduct_factId_fkey` FOREIGN KEY (`factId`) REFERENCES `facture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
