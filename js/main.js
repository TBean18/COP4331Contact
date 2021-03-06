var urlBase = 'http://161.35.181.141/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";
var selectedContactId;
const exampleResult = document.getElementById("exampleResult");
var searchContactResults;
var deleteFlag = false;


function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
//	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"Username" : "' + login + '", "Password" : "' + password + '"}';
	var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );

		userId = jsonObject.id;

		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();

		window.location.href = "main-page.html";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doLogout()
{
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		// document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

(function ($) {
    "use strict";

    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function(){
        $(this).on('blur', function(){
            if(validate(this) == false){
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

     function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf135;</span>')
        $('.btn-hide-validate').each(function(){
            $(this).on('click',function(){
               hideValidate(this);
            });
        });
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }



})(jQuery);

function createUser()
{
	userId = 0;

	// Gather info from HTML

	firstName = document.getElementById("firstName").value;
	lastName = document.getElementById("lastName").value;
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
//	var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = JSON.stringify({"Username" :  login, "Password" : password, "FirstName" : firstName, "LastName" : lastName});
	var url = urlBase + '/AddUser.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );

		userId = jsonObject.id;

		if( jsonObject.error == 'User already exists')
		{
			document.getElementById("loginResult").innerHTML = "User already exists";
			return;
		}
		else if( jsonObject.error != '')
		{
			document.getElementById("loginResult").innerHTML = "Error has occured";
			return;
		}

		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		saveCookie();

		window.location.href = "main-page.html";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function searchContact()
{
	if(userId === 0) readCookie();
	var srch = document.getElementById("search").value;
	document.getElementById("search").innerHTML = "";

	var contactList = "";

	var jsonPayload = '{"Search" : "' + srch + '","UserID" : ' + userId + '}';
	var url = urlBase + '/SearchContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse( xhr.responseText );
				console.log(jsonObject);
				document.getElementById('searchResultsContainer').innerHTML = '';
				searchContactResults = jsonObject.results;
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					appendSearchResult(jsonObject.results[i]);
				}

			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		// TODO: What should we do with this error?
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function selectContact(contact){
	selectedContactId = contact.ID;
	document.getElementById('addressInput').placeholder = contact.Address;
	document.getElementById('nameInput').placeholder = contact.Name;
	document.getElementById('phoneInput').placeholder = contact.Phone;
	document.getElementById('emailInput').placeholder = contact.Email;

	document.getElementById('addressInput').value = '';
	document.getElementById('nameInput').value = '';
	document.getElementById('phoneInput').value = '';
	document.getElementById('emailInput').value = '';

	document.getElementById('nameInput').readOnly = true;
	document.getElementById('addressInput').readOnly = true;
	document.getElementById('phoneInput').readOnly = true;
	document.getElementById('emailInput').readOnly = true;

	document.getElementById('deleteContactButton').style.display = 'none';
	document.getElementById('saveChangesButton').style.display = 'none';
}

function clearEdit() {
	document.getElementById("confirmationText").style.display = 'none';
	document.getElementById("deleteContactButton").textContent = 'Delete';
	document.getElementById("editContactButton").textContent = 'Edit';

	document.getElementById('deleteContactButton').style.display = 'none';
	document.getElementById('saveChangesButton').style.display = 'none';

	document.getElementById('nameInput').readOnly = true;
	document.getElementById('addressInput').readOnly = true;
	document.getElementById('phoneInput').readOnly = true;
	document.getElementById('emailInput').readOnly = true;

	deleteFlag = false;
}

function editContactMode(){

	if (deleteFlag)
	{
		document.getElementById("confirmationText").style.display = 'none';
		document.getElementById("deleteContactButton").textContent = 'Delete';
		document.getElementById("editContactButton").textContent = 'Edit';
		deleteFlag = false;
		$('#viewContact').modal('hide');

		clearEdit();
	}

	else
	{
		document.getElementById('deleteContactButton').style.display = 'block';
		document.getElementById('saveChangesButton').style.display = 'block';

		document.getElementById('nameInput').readOnly = false;
		document.getElementById('addressInput').readOnly = false;
		document.getElementById('phoneInput').readOnly = false;
		document.getElementById('emailInput').readOnly = false;
	}
}

function updateContact(){
	var name = document.getElementById('nameInput').value;
	if (name == "")
		name = document.getElementById('nameInput').placeholder;
	var phone = document.getElementById('phoneInput').value;
	if (phone == "")
		phone = document.getElementById('phoneInput').placeholder;
	var email = document.getElementById('emailInput').value;
	if (email == "")
		email = document.getElementById('emailInput').placeholder;
	var address = document.getElementById('addressInput').value;
	if (address == "")
		address = document.getElementById('addressInput').placeholder;

	var jsonPayload = JSON.stringify({'Name': name, 'Phone': phone, 'Email': email, 'Address': address, 'ID': selectedContactId});

	var xhr = new XMLHttpRequest();
	var url = urlBase + '/UpdateContact.' + extension;
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.send(jsonPayload);
	} catch (error) {
		console.log(error);
	}

	clearEdit();
	searchContact();
}

function createContact(){
	if(userId <= 0){
		readCookie()
	}
	var newContactFirstName = document.getElementById("newContactFirstName").value;
	var newContactLastName = document.getElementById("newContactLastName").value;
	var name = (newContactFirstName + " " + newContactLastName).trim();
	var phone = (document.getElementById("newContactPhoneNumber").value).trim();
	var email =  (document.getElementById("newContactEmail").value).trim();
	var address = (document.getElementById("newContactAddress").value).trim();

	var jsonPayload = JSON.stringify({'Name': name, 'Phone': phone, 'Email': email, 'Address': address, 'UserID':userId} )

	var xhr = new XMLHttpRequest();
	var url = urlBase + '/AddContact.' + extension;
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try {
		xhr.send(jsonPayload);
	} catch (error) {
		console.log(error);
	}
	searchContact();
}

function appendSearchResult(result){
	const searchResultsContainer = document.getElementById("searchResultsContainer");
	const exampleResult = document.getElementById("exampleResult");
	var entry = exampleResult.cloneNode(true);
	entry.innerHTML = result.Name;
	entry.style.display = 'block';
	entry.id = result.ID;
	entry.addEventListener('click', function() {
		selectContact(result);
	});
	searchResultsContainer.appendChild(entry);
}

function confirmContactDelete(){
	document.getElementById("confirmationText").style.display = 'block';
	document.getElementById("deleteContactButton").textContent = 'Yes';
	document.getElementById("editContactButton").textContent = 'No';
	deleteFlag = true;

	$('#viewContact').modal('show');
}

function deleteContact(){

	if (deleteFlag) {
		document.getElementById("confirmationText").style.display = 'none';
		document.getElementById("deleteContactButton").textContent = 'Delete';
		document.getElementById("editContactButton").textContent = 'Edit';
		deleteFlag = false;
		$('#viewContact').modal('hide');

		clearEdit();

		var jsonPayload = JSON.stringify({'ContactID': selectedContactId});
		var xhr = new XMLHttpRequest();
		var url = urlBase + '/DeleteContact.' + extension;
		xhr.open("DELETE", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try {
			xhr.send(jsonPayload);
		} catch (error) {
			console.log(error);
		}
		document.getElementById(String(selectedContactId)).remove();
	}
	else {
		confirmContactDelete();

		$( "viewContact" ).submit(function( event ) {
  		event.preventDefault();
		});
	}
}

function initilizeCreateContact(){
	document.getElementById("newContactFirstName").value = '';
	document.getElementById("newContactLastName").value = '';
	document.getElementById("newContactPhoneNumber").value = '';
	document.getElementById("newContactEmail").value = '';
	document.getElementById("newContactAddress").value = '';
}
