CREATE TABLE `events` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`start_time` datetime NOT NULL,
	`end_time` datetime NOT NULL,
	`timezone` varchar(50) NOT NULL,
	`location_type` enum('PHYSICAL','VIRTUAL') NOT NULL,
	`location` varchar(255) NOT NULL,
	`status` enum('DRAFT','PUBLISHED','CANCELLED') NOT NULL DEFAULT 'DRAFT',
	`is_public` boolean NOT NULL DEFAULT false,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `events_id` PRIMARY KEY(`id`)
);
