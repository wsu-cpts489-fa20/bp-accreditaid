# Final Speedgolf App
This code base starts with the MERN stack MVP implmentation of the speedgolf
app as it was deployed to MongoDB Atlas and AWS EB in Chapter 24. To that it adds
some key features that were included as end-of-chapter exercises:

* Ability to reset password using security question/answer
* Ability to delete a speedgolf round
* Ability to edit and delete a user account

This repo serves as the starting code for all of the CptS 489 project teams in the
Fa20 semester. It will be pushed to their repos, deployed to their instances on
AWS EB, and served through https://[proj-name].bfapp.org.

## Installation overview
This section explains how to install this Node.js application

To install you need to:
* Install [Node.js 14](https://nodejs.org/en/)
* Run `npm install && npm install-client` inside of root folder
* Copy `.env-example` to a new file `.env` and edit it.

## Development process:
This section explains how to build and run application

* To start an application run `npm start` or `npm run start`. Application is served on http://localhost:8081 locally. _Note: it will not compile files._

* To build an application run `npm run build` which will compile both server code and client code.

* If you want to build server code only you can run `npm run build-server`.

* If you want to build client code only you can run `npm run build-client`.

* If you want application to recompile to any changes use `npm run start:dev`. It will recompile it for any changes and restart the server.

## Configuration section:

To connect the app to your MongoDB database, create a .env file in the 
project root directory. On the first line of that file, add this:
MONGO_STR=<YOUR_MONGO_CONNECTION_STRING>

You'll should also add the client ids and client secrets of each of your 
OAuth providers to the `.env` file. Here's an example for GitHub:
GH_CLIENT_ID='<CLIENT ID INSIDE QUOTES>'
GH_CLIENT_SECRET='<CLIENT SECRET INSIDE QUOTES>'

Make sure to add `.env` to your `.gitignore` file so that your secrets aren't stored in your GitHub repo!

The app is presently set be served to http://localhost:8081 You'll need to update DEPLOY_URL in server.js for remote deployment.