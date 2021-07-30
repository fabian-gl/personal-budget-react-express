# My Budget

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Mock working database: transactions.sql file in root folder.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

This will run the React Client at http://localhost:3000, and run the backend at http://localhost:5000


### `npm run build`

Builds the app for production to the `build` folder.\

Important note: In order for the proyect to work when deployed, the enviromental variable NODE_ENV (located in the root folder/config/config.env) must be changed to "production" for the server to create static folder with bundled app.

Also the apiRootUrl constant must be changed in the serverCalls.js file