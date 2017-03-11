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
  PRIMARY KEY (`id`),
  KEY `owner` (`owner`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Contenu de la table `game`
--

INSERT INTO `game` (`id`, `name`, `state`, `owner`) VALUES
(1, 'Jeu', '0', 217),
(2, 'Jeu', '0', 217),
(3, 'Jeu', '0', 217);

-- --------------------------------------------------------

--
-- Structure de la table `game_player`
--

CREATE TABLE IF NOT EXISTS `game_player` (
  `id_game` varchar(255) NOT NULL,
  `id_player` varchar(255) NOT NULL,
  PRIMARY KEY (`id_game`),
  KEY `id_player_1_idx` (`id_player`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `game_player`
--

INSERT INTO `game_player` (`id_game`, `id_player`) VALUES
('1', '217x2fc3qsktzkuugcpy462ea'),
('2', '217x2fc3qsktzkuugcpy462ea'),
('3', '217x2fc3qsktzkuugcpy462ea');

-- --------------------------------------------------------

--
-- Structure de la table `game_song`
--

CREATE TABLE IF NOT EXISTS `game_song` (
  `id_song` varchar(255) NOT NULL,
  `id_game` varchar(255) NOT NULL,
  PRIMARY KEY (`id_song`),
  KEY `id_game_1_idx` (`id_game`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `game_song`
--

INSERT INTO `game_song` (`id_song`, `id_game`) VALUES
('1zWMf9bVyhY5W3ZORbjNWt', '1'),
('2dBwB667LHQkLhdYlwLUZK', '1'),
('3eRvE11OJfCYnaZwCFhMZD', '1'),
('49FYlytm3dAAraYgpoJZux', '1'),
('4MV4wa3Dke1GMBtk06GMR0', '1'),
('5fyIGoaaKelzdyW8ELhYJZ', '1'),
('5J4ZkQpzMUFojo1CtAZYpn', '1'),
('5pfJsMwoRYKampPay8amX0', '1'),
('6HTJZ0TQJVMSKkUGzAOe2h', '1'),
('6nek1Nin9q48AVZcWs9e9D', '1'),
('12D0n7hKpPcjuUpcbAKjjr', '2'),
('2slbJay1LPdOafYYCTe5Ss', '2'),
('3MjUtNVVq3C8Fn0MP3zhXa', '2'),
('4fwbGKNExPtPHbor1TBSY4', '2'),
('4u26EevCNXMhlvE1xFBJwX', '2'),
('67citk3uzWs5qbaIVKTeg8', '2'),
('70yhaHLp9STtzI2Kzba6Tr', '2'),
('7CluliR1UA3G0IivzTw5sN', '2'),
('7nRmfGNhHKEEu5o8yFXLXt', '2'),
('7wZUrN8oemZfsEd1CGkbXE', '2'),
('0FDzzruyVECATHXKHFs9eJ', '3'),
('0gb1J5UrTpzaU1s3nupgCd', '3'),
('11bD1JtSjlIgKgZG2134DZ', '3'),
('2qxaR31Te4xDR2yO6LqM8z', '3'),
('3ibKnFDaa3GhpPGlOUj7ff', '3'),
('432hUIl3ISDeytYW5XBQ5h', '3'),
('455AfCsOhhLPRc68sE01D8', '3'),
('4VC5nFbYO4avKksJ9jN4pY', '3'),
('7kftK4n15rl1wbpfjSq2Tk', '3'),
('7vFv0yFGMJW3qVXbAd9BK9', '3');

-- --------------------------------------------------------

--
-- Structure de la table `player`
--

CREATE TABLE IF NOT EXISTS `player` (
  `id` varchar(255) NOT NULL,
  `pseudo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `player`
--

INSERT INTO `player` (`id`, `pseudo`) VALUES
('217x2fc3qsktzkuugcpy462ea', '217x2fc3qsktzkuugcpy462ea');

-- --------------------------------------------------------

--
-- Structure de la table `song`
--

CREATE TABLE IF NOT EXISTS `song` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `preview_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `song`
--

INSERT INTO `song` (`id`, `name`, `url`, `preview_url`) VALUES
('0FDzzruyVECATHXKHFs9eJ', 'A Sky Full of Stars', 'spotify:track:0FDzzruyVECATHXKHFs9eJ', 'https://p.scdn.co/mp3-preview/dca7402083b8dbf0e2a5e91f49eb76bde94cd493?cid=null'),
('0gb1J5UrTpzaU1s3nupgCd', 'No Money', 'spotify:track:0gb1J5UrTpzaU1s3nupgCd', 'https://p.scdn.co/mp3-preview/fe269d15b08ee08b10c9fc04c5ed06decaf90ea8?cid=null'),
('11bD1JtSjlIgKgZG2134DZ', 'Chasing Cars', 'spotify:track:11bD1JtSjlIgKgZG2134DZ', 'https://p.scdn.co/mp3-preview/2af2fa8929acd01b7e09984714e85e8c0d753af4?cid=null'),
('12D0n7hKpPcjuUpcbAKjjr', 'Don&#39;t Like.1', 'spotify:track:12D0n7hKpPcjuUpcbAKjjr', 'https://p.scdn.co/mp3-preview/fef716a78bda6c3ce06f3a7b12d4ad5e47035984?cid=null'),
('1zWMf9bVyhY5W3ZORbjNWt', 'LIKE I WOULD', 'spotify:track:1zWMf9bVyhY5W3ZORbjNWt', 'https://p.scdn.co/mp3-preview/d6e8ae966cc02e324ab0991a68392349e473096f?cid=null'),
('2dBwB667LHQkLhdYlwLUZK', 'Summertime Sadness', 'spotify:track:2dBwB667LHQkLhdYlwLUZK', 'https://p.scdn.co/mp3-preview/70fd76d91ddc1aaf69575b8da46ba0d35254929b?cid=null'),
('2qxaR31Te4xDR2yO6LqM8z', 'Rock Bottom', 'spotify:track:2qxaR31Te4xDR2yO6LqM8z', 'https://p.scdn.co/mp3-preview/1d545c6bc3ec62fe4de39bdc1d78a755e60c3dc8?cid=null'),
('2slbJay1LPdOafYYCTe5Ss', 'Nobody Else But You', 'spotify:track:2slbJay1LPdOafYYCTe5Ss', 'https://p.scdn.co/mp3-preview/98f688cf8830b8d6260de45073e8c3da525b88d1?cid=null'),
('3eRvE11OJfCYnaZwCFhMZD', 'Nervous - The Ooh Song/Mark McCabe Remix', 'spotify:track:3eRvE11OJfCYnaZwCFhMZD', 'https://p.scdn.co/mp3-preview/d388dff2663a9ba597ca8955b4be311699adc62e?cid=null'),
('3ibKnFDaa3GhpPGlOUj7ff', 'Let Me Love You', 'spotify:track:3ibKnFDaa3GhpPGlOUj7ff', 'https://p.scdn.co/mp3-preview/cf789f03af0823c236804eac219c0589da733bd3?cid=null'),
('3MjUtNVVq3C8Fn0MP3zhXa', '...Baby One More Time', 'spotify:track:3MjUtNVVq3C8Fn0MP3zhXa', 'https://p.scdn.co/mp3-preview/da2134a161f1cb34d17c2d6d7e77cc93d1c1e6f7?cid=null'),
('432hUIl3ISDeytYW5XBQ5h', 'Wolves', 'spotify:track:432hUIl3ISDeytYW5XBQ5h', 'https://p.scdn.co/mp3-preview/bafbf37e20c134fd56a945c535553609d1f19eaf?cid=null'),
('455AfCsOhhLPRc68sE01D8', 'Last Friday Night (T.G.I.F.)', 'spotify:track:455AfCsOhhLPRc68sE01D8', 'https://p.scdn.co/mp3-preview/102255c25347769652df929b2cedb748a7e49b4a?cid=null'),
('49FYlytm3dAAraYgpoJZux', 'Umbrella', 'spotify:track:49FYlytm3dAAraYgpoJZux', 'https://p.scdn.co/mp3-preview/d4dc709a0ef2c7cb87e34571b60183c912e7511b?cid=null'),
('4fwbGKNExPtPHbor1TBSY4', 'Unconditionally', 'spotify:track:4fwbGKNExPtPHbor1TBSY4', 'https://p.scdn.co/mp3-preview/06ba08baf86bb3964d582eae2c43d03a1b4d46a4?cid=null'),
('4MV4wa3Dke1GMBtk06GMR0', 'Keep On', 'spotify:track:4MV4wa3Dke1GMBtk06GMR0', 'https://p.scdn.co/mp3-preview/964b318828de31ea1181982b70648811909b9fc1?cid=null'),
('4u26EevCNXMhlvE1xFBJwX', 'If I Die Young', 'spotify:track:4u26EevCNXMhlvE1xFBJwX', 'https://p.scdn.co/mp3-preview/d0a1b6cda0a9a9799c933a2c28b79cd2909966ca?cid=null'),
('4VC5nFbYO4avKksJ9jN4pY', 'Just Give Me a Reason', 'spotify:track:4VC5nFbYO4avKksJ9jN4pY', 'https://p.scdn.co/mp3-preview/ef4de7cafc3510bd0664b6173c79dc6dee229039?cid=null'),
('5fyIGoaaKelzdyW8ELhYJZ', 'Feeling Myself', 'spotify:track:5fyIGoaaKelzdyW8ELhYJZ', 'https://p.scdn.co/mp3-preview/1a1f94dfaec28d896a47410b73d64599db713fc2?cid=null'),
('5J4ZkQpzMUFojo1CtAZYpn', 'Love Me Harder', 'spotify:track:5J4ZkQpzMUFojo1CtAZYpn', 'https://p.scdn.co/mp3-preview/f4f7e8b96f17579e1ed294d2b8df6977d5c8c5be?cid=null'),
('5pfJsMwoRYKampPay8amX0', 'Downtown (feat. Melle Mel, Grandmaster Caz, Kool Moe Dee & Eric Nally)', 'spotify:track:5pfJsMwoRYKampPay8amX0', 'https://p.scdn.co/mp3-preview/40ca4e22a5276cc715a6616f0698ca9be99f79c4?cid=null'),
('67citk3uzWs5qbaIVKTeg8', 'Church Bells', 'spotify:track:67citk3uzWs5qbaIVKTeg8', 'https://p.scdn.co/mp3-preview/5052781393822798099b28647a7a3266971835dc?cid=null'),
('6HTJZ0TQJVMSKkUGzAOe2h', 'Old Thing Back (feat. Ja Rule and Ralph Tresvant)', 'spotify:track:6HTJZ0TQJVMSKkUGzAOe2h', 'https://p.scdn.co/mp3-preview/5ccc16c87a984758a4c0db58ef82c739f24929eb?cid=null'),
('6nek1Nin9q48AVZcWs9e9D', 'Paradise', 'spotify:track:6nek1Nin9q48AVZcWs9e9D', 'https://p.scdn.co/mp3-preview/99475c9d11e4df26ca9d1460fbe0654e687d79e0?cid=null'),
('70yhaHLp9STtzI2Kzba6Tr', 'Best Mistake', 'spotify:track:70yhaHLp9STtzI2Kzba6Tr', 'https://p.scdn.co/mp3-preview/aecbc72c6e99a8e114dd6a3b7fd1374cba57fb87?cid=null'),
('7CluliR1UA3G0IivzTw5sN', 'Don&#39;t Leave - Gryffin Remix', 'spotify:track:7CluliR1UA3G0IivzTw5sN', 'https://p.scdn.co/mp3-preview/3067ca6c0fc398864394979282c134395bb0a052?cid=null'),
('7kftK4n15rl1wbpfjSq2Tk', 'Wherever I Go', 'spotify:track:7kftK4n15rl1wbpfjSq2Tk', 'https://p.scdn.co/mp3-preview/6331e4ba133344727dd9bc70995ad61c0a7ea4c6?cid=null'),
('7nRmfGNhHKEEu5o8yFXLXt', 'Magnets', 'spotify:track:7nRmfGNhHKEEu5o8yFXLXt', 'https://p.scdn.co/mp3-preview/81e59f1fa15a67ad890133cf742a649add1b93ed?cid=null'),
('7vFv0yFGMJW3qVXbAd9BK9', 'Your Body Is a Wonderland', 'spotify:track:7vFv0yFGMJW3qVXbAd9BK9', 'https://p.scdn.co/mp3-preview/7d1019b439ef1aae6d7f51d7e1d6d7a0ed94f1a6?cid=null'),
('7wZUrN8oemZfsEd1CGkbXE', 'Bleeding Love', 'spotify:track:7wZUrN8oemZfsEd1CGkbXE', 'https://p.scdn.co/mp3-preview/b0aace1f8a27b540a9fd96775d7665e3e2b73029?cid=null');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
