# My Budget

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Mock working database: transactions.sql file in root folder.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run build`

Builds the app for production to the `build` folder.\

Important note: In order for the proyect to work when deployed, the enviromental variable NODE_ENV (located in the root folder/config/config.env) must be changed to "production" for the server to create static folder with bundled app.

Also the apiRootUrl constant must be changed in the serverCalls.js file