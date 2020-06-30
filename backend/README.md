# express-app API

## Features

* Simple `/api/` endpoint that provides you a JSON object `{hi: 'there'}`.
* Simple `/api/_health` endpoint to check the status of the API.
* Simple `/api/demo` endpoint that makes use of a router and controllers to return a JSON object `{hello: 'world'}`.
* All code following Airbnb's Javascript (ES6) style guide.
* Create deployment build with `$ npm run build`.
* Pre-commit script to prevent commit files that could break your app in production.
* `/docs` endpoint with the API documentation for external users
* `/admin` - admin panel for managing items
* `/graphql` - admin panel for managing graphql queries

## Components

* [Babel](https://babeljs.io/)
* [ESlint](https://eslint.org/)
* [Node.js](https://nodejs.org/en/)
* [Express.js](http://expressjs.com/)
* [Swagger](https://swagger.io/)

## Getting started

Just run the following commands in your terminal to start coding

```bash
git clone https://Vereline@bitbucket.org/Vereline/express-app.git
cd backend
npm install
```

You'll need to create the `/src/config/dev.js` file following the values specified in `/src/config/dev.js`.

In case you don't have a `/src/config/dev.js` file, simply create it and paste the code below(default dev settings of the project).

```js
export default {
  port: 3005,
  bodyLimit: '100kb',
  // API_URL: 'http://localhost',
  API_URL: 'localhost',
  API_PORT: 3005,
};
```

Then run:

```bash
npm run dev
```

The last command automatically runs the API exposed on <http://localhost:3005.>

!DEPRECATED! Setup container with database by running command

```bash
./start-db.sh
```

Setup container with database by running command for the first time:

```bash
docker-compose up --build -d mongodb
```

then do:

```bash
docker-compose up
```

or run in the background

```bash
docker-compose up -d
```

Setup MongoDB admin

### Installation

1. Navigate to folder & install adminMongo: `git clone https://github.com/mrvautin/adminMongo.git && cd adminMongo`
2. Install dependencies: `npm install`
3. Start application: `npm start` or `node app`
4. Visit [http://127.0.0.1:1234](http://127.0.0.1:1234) in your browser
5. Add a connection `mongodb://root-user:root-password@127.0.0.1:27017/express-app-db`

## Deployment

To create a build for production you need to build your current project with the following command:
`$ npm run build`

Then copy all files inside `/dist` folder and put all of them in your server.
