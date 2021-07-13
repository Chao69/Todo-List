const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()

const methodOverride = require('method-override')
// connect to mondoDB/solve the connect DeprecationWarning
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// db connect fail tips
db.on('error', () => {
  console.log('mongodb error!')
})

// db connect succeed tips
db.once('open', () => {
  console.log('mongodb connected!')
})

// define express-handlebars engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// use method-override
app.use(methodOverride('_method'))

// use routes
app.use(routes)

// http://localhost:3000 connect succeed tips
app.listen(3000, () => {
  console.log('App is runnung on http://localhost:3000.')
})