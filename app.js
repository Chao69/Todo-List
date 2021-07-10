const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')

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
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// define 根目錄 static view
app.get('/', (req, res) => {
  // 取得所有Todo資料
  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

// create new todo
app.get('/todos/new', (req, res) => {
  // link to create page
  return res.render('new')
})

app.post('/todos', (req, res) => {
  // create new todo to database & home page
  const name = req.body.name

  return Todo.create({ name })
    .then(() => res.redirect('/'))
    .catch(erro => console.log(error))
})

// http://localhost:3000 connect succeed tips
app.listen(3000, () => {
  console.log('App is runnung on http://localhost:3000.')
})