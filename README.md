# SQLI-Prevention
A project to demonstrate SQL injection prevention techniques. This project is an implementation of the following papers

 1. [Detection of SQL injection attacks by removing the parameter values
    of SQL query](https://ieeexplore.ieee.org/document/8398896)
 2. [Prevention of SQL Injection Attacks using Query Hashing Technique](https://ieeexplore.ieee.org/document/9581804)
 
 The `compareQueries` function in the *server/index.js* file of every branch contains code that implements the papers.
 
 The `param-removal` branch contains code for Paper 1 and `query-hash` branch contains code for Paper 2.

*The injections.txt* file contains injections to test the prevention methods. The `main` branch is vulnerable to these injections while the other branches are not.

## Setup Instructions

 1. MySQL must be installed to run this application. To install MySQL visit https://www.mysql.com/downloads/
 2. Clone the repository and open it the terminal
 3. Open the client and server folders in the terminal and run `npm install` in both 	to install packages to run the application
 4. Populate your MySQL credentials between lines 14-20 of *server/index.js* 
 5.  Create a table in your database using the following command
> Create table users(username varchar(100), password varchar(100));
 6. Open the server folder and run `node index.js` to start the server
 7. Open the client folder and run `npm start` to start the front-end
 8. The application will visible on http://localhost:3000/
