<?php
$config = require_once 'config.php';

    try {
		$dsn = 'mysql:host='.$config['host'];
        $dbh = new PDO($dsn,  $config['username'], $config['password']);

        $dbh->exec("CREATE DATABASE IF NOT EXISTS `task`;
		        		USE `task`;
		                CREATE TABLE IF NOT EXISTS `task_list` (
							  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
							  `title` VARCHAR(50) NOT NULL,
							  `desc` VARCHAR(500) NOT NULL,
							  `start_date` VARCHAR(50) NOT NULL,
							  `id_in_tasks` VARCHAR(50) NOT NULL,
							  `direction` VARCHAR(50) NOT NULL,
							  PRIMARY KEY (`id`)
						) ENGINE=INNODB DEFAULT CHARSET=utf8;	        		
					
					
				");

    } catch (PDOException $e) {
    	
    }
    header("Location: ../index.html");
?>
`title`,`desc`,`start_date`,`end_date_seconds`,`id_in_task`,`direction`) VALUES ('$title','$desc','$start_date','$end_date_seconds','$id_in_task','$direction');"; 
