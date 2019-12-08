
// set environment variables first
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.BACKEND_PORT || 8080
const isDev = process.env.NODE_ENV === 'development'
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes/api')
// const staticFilesProd = path.resolve(__dirname, 'build')
// const staticFilesDev = 'public'
// const staticFiles = isDev ? staticFilesDev : staticFilesProd

const MONGO_URI = "mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME
console.log(MONGO_URI)

//Avoid CORS issues when accessing from another domain
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//connect to the database
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true  })
  .then(() => console.log(`Database connected successfully`))
  .catch(err => console.log(err));

//since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;


//Set the view engine
app.set("view engine", "ejs")


//Start the Server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

// create a GET route
app.get('/', (req, res) => res.render("landing"))

app.get('/questions', (req, res) => res.render("questions"))

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});