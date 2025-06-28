# UserApi web application

It is a basic Node.js web application that exposes REST API methods, consumed by an HTML UI, and manages users. Data is persisted in a PostgreSQL database.


## List of API methods:

- **NAME          (VERB):**
  - healthcheck     (GET)
  - addUser         (POST)
  - getUser         (GET)
  - getAll          (GET)
  - deleteUser      (POST)
  - updateUser      (POST)


## Other:

- Links to Prometheus and Grafana
- Link to swagger


## Installation:

This application is written on NodeJS and it uses Postgres database. Go to the root directory of the application (where `package.json` file located) and run:

```
npm install 
```

## Starting application:

- Start a web server

From the root directory of the project:

```
npm start
```

## Testing

From the root directory of the project:

```
npm test
```
