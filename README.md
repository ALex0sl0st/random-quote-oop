# Random Quotes App

This is a modular JavaScript web app that displays random quotes from three sources:

- a local array of predefined quotes
- an external public quote API
- a local Express server running on your machine

---

## Features

- Get a random quote from:
  - local memory (`quotes.js`)
  - public API (`https://quoteslate.vercel.app`)
  - your own server (`http://localhost:3000`)
- Mark quotes as favorite
- Save and load favorites from localStorage
- Built with clean object-oriented architecture

---

## Technologies

- JavaScript (ES6 Modules, OOP)
- HTML / CSS
- Express.js (for local API)
- CORS support
- Nodemon for development

### Development Mode

#### Run server

1. Navigate to the root directory of the project.
2. Open new terminal window.
3. Change directory to the server subfolder:
   `cd server`
4. Install server dependencies by running the following command:
   `npm install`
5. Run server in the development mode with hot reload feature:
   `npm run dev`

### Run client

1. Open new terminal window in the root of the project
2. Run client in the development mode with hot reload:
   `npx live-server client`

---

## Running the App in Production Mode

### Run server

1. Navigate to the root directory of the project.
2. Open new terminal window.
3. Change directory to the server subfolder:
   `cd server`
4. Install server dependencies by running the following command:
   `npm install
5. Run server in the production mode:
   `npm start`
6. Configure hosting server where you run application to forward all requests to the
   http://localhost:3000
7. Take assigned by the hosting provider URL for your backend API server.
   For example https://quoteslate.vercel.app

### Run client

1. There is no need to build the client as it already contains HTML, CSS and JS files
2. Host all client files from the `client` subfolder on the public web server

`npx live-server client`
