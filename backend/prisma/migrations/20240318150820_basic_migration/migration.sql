-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('USER', 'ADMIN', 'WORKER') NOT NULL DEFAULT 'USER';
