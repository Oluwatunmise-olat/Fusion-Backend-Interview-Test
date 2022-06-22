CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `tag` int8 NOT NULL,
  `type` ENUM ('user', 'admin'),
  `email` varchar(225) UNIQUE NOT NULL,
  `phone` varchar(14) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_email_verified` bool DEFAULT false,
  `is_phone_verified` bool DEFAULT false,
  `password` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT now(),
  `updated_at` timestamp NOT NULL DEFAULT now()
);

CREATE TABLE `accounts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `currency_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT now(),
  `updated_at` timestamp NOT NULL DEFAULT now()
);

CREATE TABLE `transactions` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `account_id` int NOT NULL,
  `status` ENUM ('pending', 'successful', 'cancelled') DEFAULT "pending",
  `type` ENUM ('credit', 'debit'),
  `gateway` ENUM ('paystack', 'flutterwave', 'monnify'),
  `currency_id` int NOT NULL,
  `description` text,
  `reference` varchar(225) NOT NULL,
  `amount` decimal NOT NULL
);

CREATE TABLE `beneficiaries` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `source` int NOT NULL,
  `target` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT now(),
  `updated_at` timestamp NOT NULL DEFAULT now()
);

CREATE TABLE `currencies` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `symbol` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT now(),
  `updated_at` timestamp NOT NULL DEFAULT now()
);

ALTER TABLE `beneficiaries` ADD FOREIGN KEY (`source`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `beneficiaries` ADD FOREIGN KEY (`target`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `accounts` ADD FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON UPDATE CASCADE;

ALTER TABLE `transactions` ADD FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON UPDATE CASCADE;

ALTER TABLE `transactions` ADD FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON UPDATE CASCADE;
