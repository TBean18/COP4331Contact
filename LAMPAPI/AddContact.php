<?php
	$inData = getRequestInfo();

	$email = $inData["Email"];
	$phone = $inData["Phone"];
	$name =  $inData["Name"];
	$userID = $inData["UserID"];
	$address = $inData["Address"];

	$conn = new mysqli("localhost", "API", "xXPickleAPI4331Xx", "ProjectData");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "select * from Contacts where Name='" . $name . "' and UserID='" . $userID . "'";
		$result = $conn->query($sql);
		if( $result->num_rows > 0 )
		{
			returnWithError( 'Contact already exists' );
			return;
		}
		$sql = "insert into Contacts (Name,Email,Phone,Address,UserID) VALUES ( '" . $name . "', '" . $email . "', '" . $phone . "', '". $address . "', " . $userID . ")";
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