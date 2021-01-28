<?php
	$inData = getRequestInfo();

	$contactID = $inData["ContactID"]

	$conn = new mysqli("localhost", "API", "xXPickleAPI4331Xx", "ProjectData");
	$ret = ""
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "DELETE FROM Contacts WHERE ID = " . $contactID;
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$ret = $conn->info;
		$conn->close();
	}

	returnWithInfo($ret);

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

	function returnWithInfo($info){
		$retValue = '{"info":"' . $info . '", "error":""}';
		sendResultInfoAsJson( $retValue );
	}
?>