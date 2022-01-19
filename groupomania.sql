-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int DEFAULT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `fk_comments_posts` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_comments_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (8,'Hello :)','2021-12-28 13:08:59','2021-12-28 13:08:59',2,1),(9,'Bonjour !','2021-12-28 13:43:04','2021-12-28 13:43:04',3,1),(24,'Je te souhaite une merveilleuse année 2022 !!!','2022-01-03 08:59:54','2022-01-03 08:59:54',2,11),(29,'Commentaire crée par un utilisateur déjà supprimé','2022-01-12 13:03:50','2022-01-12 13:03:50',NULL,21);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `fk_likes_posts` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_likes_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (10,'2021-12-24 14:52:26','2021-12-24 14:52:26',2,1),(11,'2021-12-26 13:23:33','2021-12-26 13:23:33',3,1),(14,'2021-12-28 10:45:39','2021-12-28 10:45:39',3,10),(18,'2021-12-30 09:20:52','2021-12-30 09:20:52',1,10),(19,'2022-01-02 16:56:16','2022-01-02 16:56:16',2,11),(20,'2022-01-02 17:01:03','2022-01-02 17:01:03',4,1),(23,'2022-01-03 09:00:48','2022-01-03 09:00:48',4,11),(24,'2022-01-04 14:29:24','2022-01-04 14:29:24',7,10),(27,'2022-01-06 14:21:29','2022-01-06 14:21:29',1,11);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imageUrl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `giphyUrl` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fk_posts_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,NULL,'https://media1.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.gif?cid=d3ffeb6dn5j2zw959zzivtikjf8r4i56ujqslonnye0ivdef&rid=giphy.gif&ct=g',NULL,'Bienvenue sur le réseau social de GROUPOMANIA 😘','2021-12-16 14:37:47','2021-12-22 13:06:21',1),(10,NULL,NULL,'https://openclassrooms.com/fr/','\nBonjour à toutes et à tous ! Je vous partage un lien vers le site d\'OpenClassrooms où vous pouvez suivre des formations en ligne. ','2021-12-26 14:46:49','2022-01-13 20:39:04',2),(11,'http://localhost:3000/uploads/giphyhappynewyear1640688579093.gif',NULL,NULL,'Bonne année 🎉🎈🎊🥂👍','2021-12-28 10:49:39','2021-12-28 10:49:39',3),(14,'http://localhost:3000/uploads/vuejs1641204568507.jpg',NULL,'https://v3.vuejs.org/guide/introduction.html#what-is-vue-js','Vue.js 3 domentation ;)','2022-01-03 10:07:43','2022-01-03 10:09:28',9),(21,NULL,NULL,NULL,'Publication crée par un utilisateur déjà supprimé','2022-01-11 12:21:43','2022-01-11 15:40:27',NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Groupomania','admin@groupomania.com','$2b$10$rWS1I1CtKi/gkKMDvSAJ6..HL1DDEzsL0svjI1.sX2sRxCcEkLo.m','http://localhost:3000/images/icon-left-font-monochrome-black1639646636230.png',1,'2021-12-14 15:34:30','2021-12-29 13:37:32'),(2,'Yeo','Hyejin','hyejinyeo@mail.com','$2b$10$Fm7VJRXGohhxZbLfqociius5oJhSj9v4scmgKhV8qoZMO.ZPm6nQm','http://localhost:3000/images/hyejinyeo1642004397998.jpg',0,'2021-12-14 15:39:22','2022-01-19 08:38:57'),(3,'Garay','Jordan','j.garay@mail.com','$2b$10$WTAXMkDMdGhWm/IakJc1r.1SUVBOHZKFtqvoONBvvznJ2xhp1vasK',NULL,0,'2021-12-15 10:55:38','2022-01-19 07:13:06'),(4,'Durantay','Quentin','qdmysql@mail.com','$2b$10$njIN5Pmp7Fte2PxwtQQJ7OXtqTDTz6XQpMKK4C7yZKvu8b8rgDhgi','http://localhost:3000/images/quentindurantay1639566683422.jpg',0,'2021-12-15 11:09:46','2021-12-15 11:15:25'),(7,'Toulmet','Alexia','alexia@mail.com','$2b$10$AVFEj3aLL4FlKb2qm.W4cuKQhcaLFM6hLZCEdJGP8OhOEbGmO37BG','http://localhost:3000/images/alexia21641990838199.png',0,'2022-01-03 09:51:41','2022-01-12 12:33:58'),(9,'Hong','Ben','ben.hong@mail.com','$2b$10$1jcmFE3pd6z92EaOKtcL0eL7UfnXetXZwcR/KtNzwkdvtMKFLfwgy','http://localhost:3000/images/benhong1641204614181.jpg',0,'2022-01-03 09:58:28','2022-01-03 10:10:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-19 12:08:03
