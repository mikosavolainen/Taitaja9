-- --------------------------------------------------------
-- Verkkotietokone:              192.168.1.123
-- Palvelinversio:               10.6.18-MariaDB-0ubuntu0.22.04.1 - Ubuntu 22.04
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Versio:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for Taitaja9
CREATE DATABASE IF NOT EXISTS `Taitaja9` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `Taitaja9`;

-- Dumping structure for taulu Taitaja9.Joukkueet
CREATE TABLE IF NOT EXISTS `Joukkueet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kilpailu_id` int(11) NOT NULL,
  `koulun_nimi` varchar(100) NOT NULL,
  `joukkueen_nimi` varchar(100) NOT NULL,
  `ryhman_numero` int(11) NOT NULL,
  `keskeyttanyt` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `kilpailu_id` (`kilpailu_id`),
  CONSTRAINT `Joukkueet_ibfk_1` FOREIGN KEY (`kilpailu_id`) REFERENCES `Kilpailut` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table Taitaja9.Joukkueet: ~0 rows (suunnilleen)
/*!40000 ALTER TABLE `Joukkueet` DISABLE KEYS */;
/*!40000 ALTER TABLE `Joukkueet` ENABLE KEYS */;

-- Dumping structure for taulu Taitaja9.Kayttajat
CREATE TABLE IF NOT EXISTS `Kayttajat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kayttajanimi` varchar(50) NOT NULL,
  `salasana_hash` varchar(255) NOT NULL,
  `rooli` enum('admin','kayttaja') NOT NULL,
  `luotu` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `kayttajanimi` (`kayttajanimi`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table Taitaja9.Kayttajat: ~0 rows (suunnilleen)
/*!40000 ALTER TABLE `Kayttajat` DISABLE KEYS */;
/*!40000 ALTER TABLE `Kayttajat` ENABLE KEYS */;

-- Dumping structure for taulu Taitaja9.Kilpailut
CREATE TABLE IF NOT EXISTS `Kilpailut` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nimi` varchar(100) NOT NULL,
  `rastien_maara` int(11) NOT NULL,
  `luotu` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table Taitaja9.Kilpailut: ~0 rows (suunnilleen)
/*!40000 ALTER TABLE `Kilpailut` DISABLE KEYS */;
/*!40000 ALTER TABLE `Kilpailut` ENABLE KEYS */;

-- Dumping structure for taulu Taitaja9.Rastit
CREATE TABLE IF NOT EXISTS `Rastit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kilpailu_id` int(11) NOT NULL,
  `rasti_numero` int(11) NOT NULL,
  `maksimi_aika_sekunneissa` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `kilpailu_id` (`kilpailu_id`),
  CONSTRAINT `Rastit_ibfk_1` FOREIGN KEY (`kilpailu_id`) REFERENCES `Kilpailut` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table Taitaja9.Rastit: ~0 rows (suunnilleen)
/*!40000 ALTER TABLE `Rastit` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rastit` ENABLE KEYS */;

-- Dumping structure for taulu Taitaja9.Suoritukset
CREATE TABLE IF NOT EXISTS `Suoritukset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `joukkue_id` int(11) NOT NULL,
  `rasti_id` int(11) NOT NULL,
  `suoritusaika_sekunneissa` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `joukkue_id` (`joukkue_id`,`rasti_id`),
  KEY `rasti_id` (`rasti_id`),
  CONSTRAINT `Suoritukset_ibfk_1` FOREIGN KEY (`joukkue_id`) REFERENCES `Joukkueet` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Suoritukset_ibfk_2` FOREIGN KEY (`rasti_id`) REFERENCES `Rastit` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table Taitaja9.Suoritukset: ~0 rows (suunnilleen)
/*!40000 ALTER TABLE `Suoritukset` DISABLE KEYS */;
/*!40000 ALTER TABLE `Suoritukset` ENABLE KEYS */;

-- Dumping structure for näkymä Taitaja9.Tulokset
-- Luodaan tilapäinen taulu VIEW-riippuvuusvirheiden voittamiseksi
CREATE TABLE `Tulokset` (
	`koulun_nimi` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`joukkueen_nimi` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`kokonaisaika` DECIMAL(32,0) NULL,
	`suoritetut_rastit` BIGINT(21) NOT NULL,
	`keskeyttanyt` TINYINT(1) NULL
) ENGINE=MyISAM;

-- Dumping structure for näkymä Taitaja9.Tulokset
-- Poistetaan tilapäinen taulu ja luodaan lopullinen VIEW-rakenne
DROP TABLE IF EXISTS `Tulokset`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `Tulokset` AS select `j`.`koulun_nimi` AS `koulun_nimi`,`j`.`joukkueen_nimi` AS `joukkueen_nimi`,sum(`s`.`suoritusaika_sekunneissa`) AS `kokonaisaika`,count(`s`.`rasti_id`) AS `suoritetut_rastit`,`j`.`keskeyttanyt` AS `keskeyttanyt` from (`Joukkueet` `j` left join `Suoritukset` `s` on(`j`.`id` = `s`.`joukkue_id`)) group by `j`.`id` order by `j`.`keskeyttanyt`,sum(`s`.`suoritusaika_sekunneissa`);

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
