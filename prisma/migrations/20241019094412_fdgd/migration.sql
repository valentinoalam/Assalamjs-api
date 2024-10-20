-- CreateTable
CREATE TABLE `AsmaulHusna` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `arab` VARCHAR(191) NOT NULL,
    `indo` VARCHAR(191) NOT NULL,
    `latin` VARCHAR(191) NOT NULL,
    `explanation` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AsmaulHusnaThumbnail` (
    `id` CHAR(36) NOT NULL,
    `asmaulHusna_id` INTEGER NOT NULL,
    `thumbnail_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `AsmaulHusnaThumbnail_asmaulHusna_id_key`(`asmaulHusna_id`),
    UNIQUE INDEX `AsmaulHusnaThumbnail_thumbnail_id_key`(`thumbnail_id`),
    UNIQUE INDEX `AsmaulHusnaThumbnail_asmaulHusna_id_thumbnail_id_key`(`asmaulHusna_id`, `thumbnail_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AsmaulHusnaThumbnail` ADD CONSTRAINT `AsmaulHusnaThumbnail_asmaulHusna_id_fkey` FOREIGN KEY (`asmaulHusna_id`) REFERENCES `AsmaulHusna`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AsmaulHusnaThumbnail` ADD CONSTRAINT `AsmaulHusnaThumbnail_thumbnail_id_fkey` FOREIGN KEY (`thumbnail_id`) REFERENCES `Thumbnail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
