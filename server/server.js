
// set environment variables first
require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.BACKEND_PORT || 8080

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});