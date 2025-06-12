// Application version, used in CI/CD pipeline
const appversion = "1.2.0"


const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')
const path = require('path') // for resolving paths

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DSTI Devops project',
      version: '1.1.0',
      description: 'API documentation',
    },
  },
  apis: ['./src/routes/*.js'], // Path to your route files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express()
const port = process.env.PORT || 3000

const db = require('./dbClient')
db.on("error", (err) => {
  console.error(err)
})

// Serve Swagger UI
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: `
      body {
        background-color:rgb(228, 236, 229); /* light blue or any color you like */
      }
    `
  })
);

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')))

//app.get('/', (req, res) => res.send('Hello from AWS !!!!'))

app.use('/user', userRouter)

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})


module.exports = server
