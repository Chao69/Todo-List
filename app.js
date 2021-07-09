const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const app = express()
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
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

// define 根目錄 static view
app.get('/', (req, res) => {
  res.render('index')
})
// http://localhost:3000 connect succeed tips
app.listen(3000, () => {
  console.log('App is runnung on http://localhost:3000.')
})