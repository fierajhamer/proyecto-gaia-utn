-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto_gaia
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `registros`
--

DROP TABLE IF EXISTS `registros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registros` (
  `id_registro` int NOT NULL AUTO_INCREMENT,
  `id_planta` int NOT NULL,
  `altura_crecimiento` float NOT NULL,
  `temperatura_ambiente` float NOT NULL,
  `observaciones` varchar(100) NOT NULL,
  `dia_revision` date NOT NULL,
  `hora_revision` time NOT NULL,
  `id_tipo_riego` int NOT NULL,
  `caudal_agua` float NOT NULL,
  PRIMARY KEY (`id_registro`),
  KEY `fk_id_planta_idx` (`id_planta`),
  KEY `fk_id_tipo_riego_idx` (`id_tipo_riego`),
  CONSTRAINT `fk_id_planta` FOREIGN KEY (`id_planta`) REFERENCES `plantas` (`id_planta`),
  CONSTRAINT `fk_id_tipo_riego` FOREIGN KEY (`id_tipo_riego`) REFERENCES `tipo_riego` (`id_tipo_riego`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registros`
--

LOCK TABLES `registros` WRITE;
/*!40000 ALTER TABLE `registros` DISABLE KEYS */;
INSERT INTO `registros` VALUES (1,1,8,30,'Las hojas son amarillas','2024-09-11','02:32:48',2,50),(2,1,9.3,35,'Las hojas apenas crecieron','2024-09-11','02:35:11',2,50),(3,2,12,35,'Las hojas son verdes','2024-09-11','02:36:13',1,80),(4,1,10,30,'Las hojas se alargaron más de lo normal','2024-09-11','18:10:29',2,50),(5,1,20,30,'El tallo se oscureció','2024-09-11','18:13:15',1,120),(6,1,20,30,'El tallo se oscureció','2024-09-11','18:13:19',1,120),(7,2,15,34,'La planta apenas cambió, salvo en su tamaño','2024-09-11','18:18:11',2,100),(8,2,16,33,'Las hojas volvieron a su color original','2024-09-11','18:19:40',2,100);
/*!40000 ALTER TABLE `registros` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-11 18:52:26
