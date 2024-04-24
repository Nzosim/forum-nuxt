-- Adminer 4.8.1 MySQL 11.2.2-MariaDB-1:11.2.2+maria~ubu2204 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `forums`;
CREATE TABLE `forums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `forums` (`id`, `nom`) VALUES
(1,	'Informatique'),
(2,	'Test');

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contenu` varchar(1000) NOT NULL,
  `date_crea` varchar(50) NOT NULL,
  `sujet_id` tinyint(4) NOT NULL,
  `author_id` tinyint(4) NOT NULL,
  `date_modif` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `messages` (`id`, `contenu`, `date_crea`, `sujet_id`, `author_id`, `date_modif`) VALUES
(1,	'ceci est un message',	'2024-03-27T16:19:28.681Z',	1,	2,	NULL),
(2,	'upadte',	'2024-03-27T16:19:33.280Z',	1,	2,	NULL),
(3,	'ceci est un message 2',	'2024-03-27T16:19:37.200Z',	2,	2,	NULL),
(4,	'ceci est un message 2',	'2024-03-27T16:19:40.176Z',	2,	1,	NULL),
(5,	'ceci est un message 2',	'2024-03-27T16:37:47.207Z',	2,	1,	NULL);

DROP TABLE IF EXISTS `sujets`;
CREATE TABLE `sujets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(200) NOT NULL,
  `date_crea` varchar(50) NOT NULL,
  `forum_id` tinyint(4) NOT NULL,
  `author_id` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `sujets` (`id`, `titre`, `date_crea`, `forum_id`, `author_id`) VALUES
(1,	'No idea',	'2024-03-27T16:13:09.925Z',	1,	2),
(2,	'Idea',	'2024-03-27T16:13:29.675Z',	1,	1),
(3,	'FAQ',	'2024-03-27T16:13:36.778Z',	2,	1);

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`,`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `login`, `password`, `role`) VALUES
(1,	'enzo',	'54a56fe6d13e8acfbbcb899456d5a52d28334071983c54b842b8551c1ad819b09c4454cd2ead59cee63572dac6ef86efef9f2f8f8b1b646d579215e8f10dfd88',	2),
(2,	'enzos',	'aebb681c2733e3fdd1def087534570760cecc49ea0da39d9ec358b48c6fe15f0cb01d67d4a1748b24028b7bb9262a1f46f850acc8cafadc556e7dfdaa170f573',	2),
(3,	'est',	'0ea255fdda88f7001557b493c8d2b14787b52eb20f63cd87337063ce132d55678c3038c91a045a6a87617f6d9d0836a75f7d020e3ec860a3da14e9a412243b90',	2),
(4,	'enzoenzo',	'a090718454a1a12a6de269cf9ae70a8bb864aab3f6054d489077aca2459d94e845cf4736a5e3d9ef56150a3a3cf5ffffa18425240f7d5ae50d078b4ae88f83e8',	2),
(5,	'admin',	'c3bb3956f9563c26e462afedcadd250b4d32640b5b4c6c0f046bae05926b3cbb6f45acf905762831ba74f205e3e93cedfc933942b24e2b923e1e25152be506ad',	1),
(6,	'test',	'32947232567346ae2bb8ddf4bf024a70caca5b86159d0f5cd9dfc942b5b942bbe6deb75a4071fcea0b676bacd0c056b6562595ab02a4d6a67167d4d1285088a6',	2),
(7,	'te1st',	'32947232567346ae2bb8ddf4bf024a70caca5b86159d0f5cd9dfc942b5b942bbe6deb75a4071fcea0b676bacd0c056b6562595ab02a4d6a67167d4d1285088a6',	1),
(8,	't',	'6ee0374cf3f8fa1599417f72cba379bd303fad5586df92c15a87caa8616972460e612cfdec72869e902cd7bcd9c44035ba4b3fd94f1cdf54457e072eda12ab28',	2);

-- 2024-04-17 19:13:51