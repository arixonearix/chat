CREATE TABLE `message_log` (
	`id` INT NOT NULL,
	`nickname` VARCHAR(25) NOT NULL,
	`message` TEXT NOT NULL,
	`created_at` DATETIME NOT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci'
;
ALTER TABLE `message_log`
	ADD INDEX `created_at` (`created_at`);
ALTER TABLE `message_log`
	CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT FIRST;
