ALTER TABLE `events` ADD `price` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `event_tickets` DROP COLUMN `price`;