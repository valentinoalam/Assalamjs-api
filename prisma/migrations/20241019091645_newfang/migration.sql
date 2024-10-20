/*
  Warnings:

  - You are about to drop the column `playlist_id` on the `thumbnail` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `video` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnails` on the `video` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[youtube_id]` on the table `Playlist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[youtube_id]` on the table `Video` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channelTitle` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channel_id` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localizedTitle` to the `Playlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `high` to the `Thumbnail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sizeCategory` to the `Thumbnail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Thumbnail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channelTitle` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channel_id` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `youtube_id` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `thumbnail` DROP FOREIGN KEY `Thumbnail_playlist_id_fkey`;

-- AlterTable
ALTER TABLE `playlist` ADD COLUMN `channelTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `channel_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `localizedDesc` VARCHAR(191) NULL,
    ADD COLUMN `localizedTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `youtube_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `thumbnail` DROP COLUMN `playlist_id`,
    ADD COLUMN `high` INTEGER NOT NULL,
    ADD COLUMN `sizeCategory` ENUM('default', 'medium', 'high', 'standard', 'maxres') NOT NULL,
    ADD COLUMN `width` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `video` DROP COLUMN `position`,
    DROP COLUMN `thumbnails`,
    ADD COLUMN `channelTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `channel_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `materyDownloadUrl` VARCHAR(191) NULL,
    ADD COLUMN `playListPosition` INTEGER NULL,
    ADD COLUMN `youtube_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `PlaylistThumbnail` (
    `id` CHAR(36) NOT NULL,
    `playlist_id` CHAR(36) NOT NULL,
    `thumbnail_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `PlaylistThumbnail_thumbnail_id_key`(`thumbnail_id`),
    UNIQUE INDEX `PlaylistThumbnail_playlist_id_thumbnail_id_key`(`playlist_id`, `thumbnail_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VideoThumbnail` (
    `id` CHAR(36) NOT NULL,
    `video_id` CHAR(36) NOT NULL,
    `thumbnail_id` CHAR(36) NOT NULL,

    UNIQUE INDEX `VideoThumbnail_video_id_key`(`video_id`),
    UNIQUE INDEX `VideoThumbnail_thumbnail_id_key`(`thumbnail_id`),
    UNIQUE INDEX `VideoThumbnail_video_id_thumbnail_id_key`(`video_id`, `thumbnail_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Playlist_youtube_id_key` ON `Playlist`(`youtube_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Video_youtube_id_key` ON `Video`(`youtube_id`);

-- AddForeignKey
ALTER TABLE `PlaylistThumbnail` ADD CONSTRAINT `PlaylistThumbnail_playlist_id_fkey` FOREIGN KEY (`playlist_id`) REFERENCES `Playlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlaylistThumbnail` ADD CONSTRAINT `PlaylistThumbnail_thumbnail_id_fkey` FOREIGN KEY (`thumbnail_id`) REFERENCES `Thumbnail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VideoThumbnail` ADD CONSTRAINT `VideoThumbnail_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `Video`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VideoThumbnail` ADD CONSTRAINT `VideoThumbnail_thumbnail_id_fkey` FOREIGN KEY (`thumbnail_id`) REFERENCES `Thumbnail`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
