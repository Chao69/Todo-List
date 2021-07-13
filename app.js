const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Todo = require('./models/todo')
const bodyParser = require('body-parser')

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

// define 根目錄 static view
app.get('/', (req, res) => {
  // 取得所有Todo資料
  Todo.find()
    .lean()
    .sort({ name: 'asc' }) //正序：'asc'; 反序：'desc'
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

// todo detail url
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

// todo edit url
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

app.put('/todos/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

// delete todo
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// http://localhost:3000 connect succeed tips
app.listen(3000, () => {
  console.log('App is runnung on http://localhost:3000.')
})