<?php 
/*
    Created by David Ghazaryan (in github as 'david262929') 
*/	
header('Access-Control-Allow-Origin: *');

include 'db.php';
$db = new Database();
$suc = ['success'=>false];
// print_r($_POST);
if ($_SERVER['REQUEST_METHOD'] === 'POST' ) {
	if(isset($_POST['add'])){
		if(isset($_POST['title']) 
			and isset($_POST['desc']) 
			and isset($_POST['start_date']) 
			and isset($_POST['direction'])
			and isset($_POST['id_in_tasks'])
		){


			$title = mysql_real_escape_string(trim($_POST['title']));
			$desc = mysql_real_escape_string(trim($_POST['desc']));
			$start_date = mysql_real_escape_string(trim($_POST['start_date']));
			$id_in_tasks = mysql_real_escape_string(trim($_POST['id_in_tasks']));
			$direction = mysql_real_escape_string(trim($_POST['direction']));

			$sql = "INSERT INTO `task_list` (`title`,`desc`,`start_date`,`id_in_tasks`,`direction`) VALUES ('$title','$desc','$start_date','$id_in_tasks','$direction');"; 
			// print_r($sql);
			if($db->execute($sql)){
				$suc['success'] = true;
			}	

		}
	}
	elseif(isset($_POST['change_direction'])){
		if(isset($_POST['id_in_tasks']) and isset($_POST['direction'])){

			$id_in_tasks = mysql_real_escape_string(trim($_POST['id_in_tasks']));
			$direction = mysql_real_escape_string(trim($_POST['direction']));

			$sql = "UPDATE `task_list` SET direction='$direction' WHERE id_in_tasks='$id_in_tasks'";
			if($db->execute($sql)){
				$suc['success'] = true;
			}	

		}
	}
}elseif ($_SERVER['REQUEST_METHOD'] === 'GET' ) {

	if(isset($_GET['get_all_tasks'])){

		$sql = "SELECT `title`,`desc`,`start_date`,`id_in_tasks`,`direction` FROM `task_list`";
		$suc['success'] = true;
		$suc['data'] = $db->query($sql);

	}
	if(isset($_GET['delete_item'])){
		if(isset($_GET['id_in_tasks'])){

			$id_in_tasks = mysql_real_escape_string(trim($_GET['id_in_tasks']));
			$sql = "DELETE FROM `task_list` WHERE `id_in_tasks` = '$id_in_tasks';";
			$db->execute($sql);
			$suc['success'] = true;
		
		}
	}
}
/*
    Created by David Ghazaryan (in github as 'david262929') 
*/
echo json_encode($suc);
?>




