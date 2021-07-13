const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./config/mongoose')

const app = express()

const methodOverride = require('method-override')

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