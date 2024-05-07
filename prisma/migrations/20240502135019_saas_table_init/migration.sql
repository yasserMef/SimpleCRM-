-- CreateTable
CREATE TABLE `facture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cltId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detailFacture` (
    `prodId` INTEGER NOT NULL,
    `factId` INTEGER NOT NULL,
    `qauntite` INTEGER NOT NULL,

    PRIMARY KEY (`prodId`, `factId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `facture` ADD CONSTRAINT `facture_cltId_fkey` FOREIGN KEY (`cltId`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detailFacture` ADD CONSTRAINT `detailFacture_prodId_fkey` FOREIGN KEY (`prodId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detailFacture` ADD CONSTRAINT `detailFacture_factId_fkey` FOREIGN KEY (`factId`) REFERENCES `facture`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
