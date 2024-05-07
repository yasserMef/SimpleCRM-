-- DropForeignKey
ALTER TABLE `facture` DROP FOREIGN KEY `facture_cltId_fkey`;

-- AlterTable
ALTER TABLE `client` MODIFY `tele` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `facture` ADD CONSTRAINT `facture_cltId_fkey` FOREIGN KEY (`cltId`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
