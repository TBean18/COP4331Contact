# [ContactlessContactList](http://contactlesscontactlist.tech/)

## Task List (Feature works with Front End)
- [X] Database
- [X] Login
- [X] Create New User
- [X] Create New Contact
- [x] Search for Contacts
- [X] Update Existing Contact
- [X] Delete Selected Contact 
- [X] Confirmation on Adding Contacts
- [X] Stop Allowing Duplicate Users
- [X] Confirmation on Update Contact
- [ ] Password Hashing (Taylor)
- [ ] Gannt Chart (Sam)
- [ ] Use Case Diagram (Phil & Sam)
- [ ] Log Out (Conrad)
- [ ] Finish Presentation (Phil to polish)
- [ ] 2x Presentation Rehearsal
  - [ ] Next Week Team Meeting
  - [ ] Day of Presentation
***
## API Documentation
***

| EndPoint | Input Parameters | Return Parameters
| -------- | ---------------- | --------------
|AddUser.php | FirstName, LastName, Username, Password| error, id
|Login.php | Username, Password | FirstName, LastName, id 
| AddContact.php | Name, Phone, Email, UserID | error
| SearchContact.php | Search, UserID | `"results": [{ "Name", Phone":, "Email":, "ID":}], "error":`
| DeleteContact.php | ContactID | info, error
| UpdateContact.php | Name, Phone, Email, ID | error

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
    - [X] All Members Present
  - Task List for the Upcoming week
    - Start Compiling the Presentation
      - Phil, Sam
    -  Set up updateContact on the front end (Conrad)
       -  Clear the contact info box
       -  Set up the save changes button
    -  Set up createContact on the front end (Taylor)
    -  Set up deleteContact on the front end
    -  Log Out Button
       -  JS is written in code.js (LAMP.zip)
- ### Week 4 - 2/5/21
  - All Members Present
  - Finish Compiling Presentation
    - Phil, Sam
  - Presentations
    - Website demonstration
      - Taylor, Jo
    - Swagger Hub API Demo
      - Conrad
    - Powerpoint
      - Sam, Phil
  - Fix the ENTER on Search Issue
    - Sam, Jo
  - 