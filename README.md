# [ContactlessContactList](http://contactlesscontactlist.tech/)

## Task List (Feature works with Front End)
- [X] Database
- [X] Login
- [X] Create New User
- [ ] Create New Contact
- [ ] Search for Contacts
- [ ] Update Existing Contact
- [ ] Delete Selected Contact 

***
## API Documentation
***

| EndPoint | Input Parameters | Return Parameters
| -------- | ---------------- | --------------
|AddUser.php | FirstName, LastName, Username, Password| error, id
|Login.php | Username, Password | FirstName, LastName, id 
| AddContact.php | FirstName, LastName, Phone, Email, UserID | error
| SearchContact.php | Search, UserID | `"results": [{ "Name", Phone":, "Email":, "ID":}], "error":`
| DeleteContact.php | ContactID | info, error

<!-- ```json
"results" {
    "Name":,
    "Phone":,
    "Email":,
    "ID":
}
``` -->


***
## Project Timeline
- ### Week 1 - 1/11/21
  - Set up Database
  - Set up first 3 API EndPoints
  - Met on 1/14/21 
    - [X] All Members Present
- ### Week 2 - 1/18/21
  - Met on 1/21/21
    - [X] All Members Present
- ### Week 3 - 1/25/21
  - Meeting on 1/29/21
    - [ ] All Members Present


    