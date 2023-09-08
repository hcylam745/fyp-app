-- fyp_db.chairs definition

CREATE TABLE `chairs` (
  `status` varchar(100) NOT NULL,
  `x` int NOT NULL,
  `y` int NOT NULL,
  `type` varchar(100) DEFAULT NULL,
  `zone` int unsigned DEFAULT NULL,
  `id` int unsigned NOT NULL,
  `date` datetime NOT NULL,
  UNIQUE KEY `chairs_un` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO fyp_db.chairs (status,x,y,`type`,`zone`,id,`date`) VALUES
	 ('occupied',1,2,'blueChair',1,1,'2023-09-08 13:20:13'),
	 ('free',2,2,'redChair',1,2,'2023-09-08 13:20:15'),
	 ('bag',3,3,'greenChair',2,3,'2023-09-08 13:33:04');