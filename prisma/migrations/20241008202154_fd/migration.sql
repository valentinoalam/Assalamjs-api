/*
  Warnings:

  - You are about to drop the column `categoryId` on the `doa` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `exam` table. All the data in the column will be lost.
  - The primary key for the `examquestion` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `examId` on the `examquestion` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `examquestion` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `videoId` on the `note` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `question` table. All the data in the column will be lost.
  - You are about to drop the column `videoId` on the `quiz` table. All the data in the column will be lost.
  - You are about to drop the column `playlistId` on the `thumbnail` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[video_id]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isAyahSajadah` to the `Ayah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Doa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exam_id` to the `ExamQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question_id` to the `ExamQuestion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_id` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_id` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playlist_id` to the `Thumbnail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `doa` DROP FOREIGN KEY `Doa_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `exam` DROP FOREIGN KEY `Exam_userId_fkey`;

-- DropForeignKey
ALTER TABLE `examquestion` DROP FOREIGN KEY `ExamQuestion_examId_fkey`;

-- DropForeignKey
ALTER TABLE `examquestion` DROP FOREIGN KEY `ExamQuestion_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `note` DROP FOREIGN KEY `Note_videoId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_userId_fkey`;

-- DropForeignKey
ALTER TABLE `quiz` DROP FOREIGN KEY `Quiz_videoId_fkey`;

-- DropForeignKey
ALTER TABLE `thumbnail` DROP FOREIGN KEY `Thumbnail_playlistId_fkey`;

-- AlterTable
ALTER TABLE `ayah` ADD COLUMN `isAyahSajadah` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `doa` DROP COLUMN `categoryId`,
    ADD COLUMN `category_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `exam` DROP COLUMN `userId`,
    ADD COLUMN `user_id` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `examquestion` DROP PRIMARY KEY,
    DROP COLUMN `examId`,
    DROP COLUMN `questionId`,
    ADD COLUMN `exam_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `question_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`exam_id`, `question_id`);

-- AlterTable
ALTER TABLE `note` DROP COLUMN `userId`,
    DROP COLUMN `videoId`,
    ADD COLUMN `user_id` CHAR(36) NOT NULL,
    ADD COLUMN `video_id` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `question` DROP COLUMN `categoryId`,
    DROP COLUMN `userId`,
    ADD COLUMN `category_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `quiz` DROP COLUMN `videoId`,
    ADD COLUMN `video_id` CHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `thumbnail` DROP COLUMN `playlistId`,
    ADD COLUMN `playlist_id` CHAR(36) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Quiz_video_id_key` ON `Quiz`(`video_id`);

-- AddForeignKey
ALTER TABLE `Doa` ADD CONSTRAINT `Doa_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exam` ADD CONSTRAINT `Exam_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamQuestion` ADD CONSTRAINT `ExamQuestion_exam_id_fkey` FOREIGN KEY (`exam_id`) REFERENCES `Exam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamQuestion` ADD CONSTRAINT `ExamQuestion_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `Question`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `Video`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Note` ADD CONSTRAINT `Note_video_id_fkey` FOREIGN KEY (`video_id`) REFERENCES `Video`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thumbnail` ADD CONSTRAINT `Thumbnail_playlist_id_fkey` FOREIGN KEY (`playlist_id`) REFERENCES `Playlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
