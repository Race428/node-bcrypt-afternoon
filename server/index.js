require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')

const {CONNECTION_STRING, SESSION_SECRET } = process.env 

const port = 4000

const app = express()

app.use(express.json())


massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('db connected')
})

app.use(
  session({
    resave:false,
    saveUninitialized: false,
    secret: SESSION_SECRET
  })
)

app.listen(port, () => console.log('listening on port', port,))

app.post('/auth/register', authCtrl.register)

