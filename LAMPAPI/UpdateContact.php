<?php
	$inData = getRequestInfo();

	$email = $inData["Email"];
	$phone = $inData["Phone"];
	$name =  $inData["Name"];
	$contactID = $inData["ID"];

	$conn = new mysqli("localhost", "API", "xXPickleAPI4331Xx", "ProjectData");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "update Contacts set Email = '" . $email . "', Phone = '" . $phone . "', Name = '" . $name . "' where ID = '" . $contactID . "';";
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