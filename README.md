# Frame Advance

This is a full-stack web app for my end project capstone. Frame Advance is an application built for
competitive people who want to review
footage of past games in order to improve.
Users can create a post with a YouTube
link, create timestamps, and leave notes
about the things they need to improve on. Users can find
other players' reviews to learn from more
advanced players. Users will then have a
database of notes with video reference to
succeed in their game of choice.

# Project Setup

## Technologies

FrameAdvance is built in .NET Core with C#. Entity Framework and ADO.NET Core are used to communicate with the SQL Server database.
The front-end is built using React and styled with Reactstrap.
Google Firebase is used for user authentication. 

## Requirements

- node.js
- npm
- SQL Server
- Google Firebase

## Installation

### Initial Set-up
1. Clone this repo onto your machine
2. You will need to create a new [Google Firebase](https://firebase.google.com/) project to set up the authentication
3. Once you have created your Firebase project, go to the project settings and take note of the Project ID and the API Key.
4. Open the appsettings.json file and replace the FirebaseProjectId value with your own.
5. In the client directory of FrameAdvance, create a .env.local file with the line `REACT_APP_API_KEY=YOUR_KEY_HERE` using your Firebase project API Key.

### Setting up the users
On your Google Firebase project, click on the Authentication link. You will need to add users that have e-mail addresses that matches the ones in the database. Make sure that you have e-mail verification set to OFF before you add the seed users. Once you've added the users, replace their Firebase UID's in the SQL file with the ones matching your newly created Firebase Users. Then you can run the SQL file.

### Setting up the DB
1. Connect to your SQL Server
2. To use the seed data in 01_DB_Create.sql you will have to add the users to Google Firebase authentication and then replace FirebaseUserId for each user with your own.
3. Run 01_DB_Create.sql to create all the neccessary tables and data.

### Install missing dependencies
1. Navigate to the client folder in your terminal
2. run `npm install` to install any missing packages

## Running the App
1. Start your server. This can be done through Visual Studio.
2. Navigate to the client folder.
3. Type the command `npm start`
4. Register as a new user or use one from the database.

## Technology Utilized
- Micorosoft SQL Server Express
- Microsoft Visual C#
- Entity Framework
- Google Firebase Authentication
- React.JS
- React Routing
