CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`content` varchar(280) NOT NULL,
	`voterId` varchar(128) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
