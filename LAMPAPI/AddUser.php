<?php
	$inData = getRequestInfo();

	$userName = $inData["Username"];
	$password = $inData["Password"];
	$firstName =  $inData["FirstName"];
	$lastName =  $inData["LastName"];
  	$UserID = 0;

	$conn = new mysqli("localhost", "API", "xXPickleAPI4331Xx", "ProjectData");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "select * from Users where Username='" . $userName . "'";
		$result = $conn->query($sql);
		if( $result->num_rows > 0 )
		{
			returnWithError( 'User already exists' );
			return;
		}
	  	$sql = "insert into Users (FirstName,LastName,Username,Password) VALUES ( '" . $firstName . "' , '" . $lastName . "', '" . $userName . "', '" . $password . "')";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
			return;
		}
    	$UserID = $conn->insert_id;
		$conn->close();
	}

	// instead return with the ID of the newly created user
	if($UserID > 0){
		returnWithID($UserID);
	}
	else {
		returnWithError( "UserID not Found" );
	}

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

	function returnWithID($userID){
		$retValue = '{"id": '. $userID .  ', "error": ""}';
		header('Content-type: application/json');
		echo $retValue;
	}
?>