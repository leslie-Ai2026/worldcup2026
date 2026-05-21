CREATE TABLE `votes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` enum('champion','best_player') NOT NULL,
	`choice` varchar(128) NOT NULL,
	`voterId` varchar(128) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `votes_id` PRIMARY KEY(`id`)
);
