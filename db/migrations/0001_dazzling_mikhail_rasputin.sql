CREATE TABLE `event_tickets` (
	`id` varchar(36) NOT NULL,
	`event_id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`status` enum('PENDING','CONFIRMED','CANCELLED') NOT NULL DEFAULT 'CONFIRMED',
	`tx_hash` varchar(100),
	`purchased_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `event_tickets_id` PRIMARY KEY(`id`)
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
CREATE INDEX `event_tickets_event_idx` ON `event_tickets` (`event_id`);--> statement-breakpoint
CREATE INDEX `event_tickets_user_idx` ON `event_tickets` (`user_id`);