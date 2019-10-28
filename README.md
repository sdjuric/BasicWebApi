# BasicWebApi
A basic web api project.

Requirements and dependencies:
* MongoDB, Nodejs, NPM 


Walkthrough:
To save time and show functionality with minimal input, here is a basic walkthrough of the API. 
I ran the server with "node server" and used Postman for testing, but anything similar will suffice.

* GET: Retrieve list of users and their details, except the ones that require authentication.  
http://localhost:3600/users

* GET: Retrieve a specific user, based on their unique ID.  
http://localhost:3600/users/EXAMPLEUSERID

* POST: Create a new user with a unique email address. (Provide a firstName, lastName, password, email, dateOfBirth, and favouriteColour in the body.)  
NOTE: It is an obvious security hazard that new users are able to authenticate and perform authenticated actions! I do it this way for demonstration purposes only! Hold on to the email and password used when creating a user with this step, they will be useful later.  
http://localhost:3600/users/register

* POST: Authenticate yourself and log in. (Provide an email and password in the body.)  
NOTE: The x-access-token that this returns will be used for authenticated requests.  
http://localhost:3600/users/authenticate	

* GET: Retrieve list of users and their full details, including hashed passwords. This requires authentication. (Provide an x-access-token in the header.)  
http://localhost:3600/authUsers

* PUT: Change a user's email. This requires authentication. (Provide an x-access-token in the header and provide the new email in the body.)  
http://localhost:3600/authUsers/EXAMPLEUSERID

* DELETE: Deletes a user. This requires authentication. (Provide an x-access-token in the header.)  
http://localhost:3600/authUsers/EXAMPLEUSERID
