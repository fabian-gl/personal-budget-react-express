# My Budget

System to help you manage the finances letting you add incomes and outcomes, and letting you see the summary of the transactions.


## Available Scripts


### `npm install`

Will install the dependencies of the project.


### `npm run dev`

In the project top directory, will start the app in dev enviroment:

This will run the React Client at http://localhost:3000, and run the backend at http://localhost:5000

If the database is not created, the system will automatically generate it for you.


### `npm run build`

Builds the app for production to the `build` folder.\

Important note: In order for the proyect to work when deployed, the enviromental variable NODE_ENV (located in the root folder/config/config.env) must be changed to "production" for the server to create static folder with bundled app.

Also the apiRootUrl constant must be changed in the serverCalls.js file.


## Dependencies

The core of the application is an node express API and a react app to consume it.

Serverside, sequelize is used to help manage the database, bcryptjs to hash user passwords, and jsonwebtoken to deal with user authentication.

On the client, I used axios to send requests to the server, react-router-dom to handle the app navigation.

As dev dependecies nodemon is used to restart the server when a file is saved, and concurrently that allows to run the server and the client with the same command.

