ALTER TABLE `event_tickets` MODIFY COLUMN `event_id` varchar(36);--> statement-breakpoint
ALTER TABLE `event_tickets` MODIFY COLUMN `user_id` varchar(36);--> statement-breakpoint
ALTER TABLE `events` ADD `event_type` enum('FREE','PAID') DEFAULT 'FREE' NOT NULL;--> statement-breakpoint
ALTER TABLE `event_tickets` ADD `price` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `event_tickets` ADD CONSTRAINT `event_tickets_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `event_tickets` ADD CONSTRAINT `event_tickets_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;