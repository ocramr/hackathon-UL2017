-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Sam 11 Mars 2017 à 00:44
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `spotplay`
--

-- --------------------------------------------------------

--
-- Structure de la table `game`
--

CREATE TABLE IF NOT EXISTS `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `state` enum('0','1','','') NOT NULL DEFAULT '0',
  `owner` varchar(20) NOT NULL,
  `score` int(11) NOT NULL default 0,
  PRIMARY KEY (`id`),
  KEY `owner` (`owner`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Structure de la table `player`
--

CREATE TABLE IF NOT EXISTS `player` (
  `id` int NOT NULL auto_increment,
  `spotify_id` varchar(255) NOT NULL,
  `pseudo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `song`
--

CREATE TABLE IF NOT EXISTS `song` (
  `id` int NOT NULL auto_increment,
  `spotify_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `preview_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `game_player`
--

CREATE TABLE IF NOT EXISTS `game_player` (
  `id_game` int NOT NULL,
  `id_player` int NOT NULL,
  PRIMARY KEY (`id_game`, `id_player`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Structure de la table `game_song`
--

CREATE TABLE IF NOT EXISTS `game_song` (
  `id_song` int NOT NULL,
  `id_game` int NOT NULL,
  PRIMARY KEY (`id_song`, `id_game`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
