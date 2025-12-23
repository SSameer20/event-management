CREATE TABLE `events` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`image` text,
	`description` text NOT NULL,
	`start_time` datetime NOT NULL,
	`end_time` datetime NOT NULL,
	`timezone` varchar(50) NOT NULL,
	`location_type` enum('PHYSICAL','VIRTUAL') NOT NULL,
	`location` varchar(255) NOT NULL,
	`status` enum('UPCOMING','COMPLETED','CANCELLED') NOT NULL DEFAULT 'UPCOMING',
	`event_status` enum('DRAFT','PUBLISHED','CANCELLED') NOT NULL DEFAULT 'DRAFT',
	`is_public` boolean NOT NULL DEFAULT false,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`event_type` enum('FREE','PAID') NOT NULL DEFAULT 'FREE',
	`price` decimal(10,2),
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	`is_active` boolean NOT NULL DEFAULT true,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `event_tickets` (
	`id` varchar(36) NOT NULL,
	`event_id` varchar(36),
	`user_id` varchar(36),
	`quantity` int NOT NULL DEFAULT 1,
	`status` enum('PENDING','CONFIRMED','CANCELLED') NOT NULL DEFAULT 'CONFIRMED',
	`tx_hash` varchar(100),
	`purchased_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `event_tickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` varchar(36) NOT NULL,
	`name` varchar(50) NOT NULL,
	`event_id` varchar(36) NOT NULL,
	CONSTRAINT `tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`wallet_address` varchar(64) NOT NULL,
	`is_active` boolean NOT NULL DEFAULT true,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_wallet_address_idx` UNIQUE(`wallet_address`)
);
--> statement-breakpoint
ALTER TABLE `event_tickets` ADD CONSTRAINT `event_tickets_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `event_tickets` ADD CONSTRAINT `event_tickets_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tags` ADD CONSTRAINT `tags_event_id_events_id_fk` FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `event_tickets_event_idx` ON `event_tickets` (`event_id`);--> statement-breakpoint
CREATE INDEX `event_tickets_user_idx` ON `event_tickets` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_tags_event_id` ON `tags` (`event_id`);--> statement-breakpoint
CREATE INDEX `idx_tags_name` ON `tags` (`name`);