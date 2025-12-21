CREATE TABLE `tags` (
	`id` varchar(36) NOT NULL,
	`name` varchar(50) NOT NULL,
	`event_id` varchar(36) NOT NULL,
	CONSTRAINT `tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `tags` ADD CONSTRAINT `tags_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `idx_tags_event_id` ON `tags` (`event_id`);--> statement-breakpoint
CREATE INDEX `idx_tags_name` ON `tags` (`name`);