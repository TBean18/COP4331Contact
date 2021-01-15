<?php
	$inData = getRequestInfo();
	
	$userName = $inData["Username"];
	$password = $inData["Password"];
	$firstName =  $inData["FirstName"];
	$lastName =  $inData["LastName"];


	$conn = new mysqli("localhost", "API", "xXPickleAPI4331Xx", "ProjectData");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
	  $sql = "insert into Users (FirstName,LastName,Username,Password) VALUES ( '" . $firstName . "' , '" . $lastName . "', '" . $userName . "', '" . $password . "')";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>