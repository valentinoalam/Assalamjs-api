-- CreateTable
CREATE TABLE `Surah` (
    `no` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `nama_panjang` VARCHAR(191) NOT NULL,
    `nama_latin` VARCHAR(191) NOT NULL,
    `arti` VARCHAR(191) NOT NULL,
    `translation` VARCHAR(191) NULL,
    `tempat_turun` VARCHAR(191) NOT NULL,
    `tafsir` VARCHAR(191) NULL,
    `jumlah_ayat` INTEGER NOT NULL,
    `audio_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ayah` (
    `id` INTEGER NOT NULL,
    `nomor` INTEGER NOT NULL,
    `arab` VARCHAR(191) NOT NULL,
    `latin` VARCHAR(191) NOT NULL,
    `terjemahan` VARCHAR(191) NOT NULL,
    `catatan_kaki` VARCHAR(191) NULL,
    `hal` INTEGER NOT NULL,
    `juz` INTEGER NOT NULL,
    `audio_url` VARCHAR(191) NULL,
    `surahNo` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Doa` (
    `id` INTEGER NOT NULL,
    `judul` VARCHAR(191) NOT NULL,
    `doa` VARCHAR(191) NOT NULL,
    `latin` VARCHAR(191) NOT NULL,
    `arti` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ayah` ADD CONSTRAINT `Ayah_surahNo_fkey` FOREIGN KEY (`surahNo`) REFERENCES `Surah`(`no`) ON DELETE RESTRICT ON UPDATE CASCADE;
