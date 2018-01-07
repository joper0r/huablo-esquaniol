--
-- Current Database: `booksapi`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `booksapi` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `booksapi`;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) DEFAULT NULL,
  `user_pw` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test','$2a$04$sTXOahpKmLBhdYJZtglQgeXH7OAIBf6K8zE.xKS4wYUOdDlrNNO46'),(2,'filled','$2a$04$Vy5x1OK9miRaSc6icRGwWO4KLCoDg1zMRQLCnfzNK5hScbt.4jazy'),(3,'blank','$2a$04$ilhMlvCcZLdnzUaKFGowjuFRdp.HnMGaOBnQ02hCok74Tn/Re7OCW');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
