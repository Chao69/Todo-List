const express = require('express')
const mongoose = require('mongoose')

const app = express()

mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send(`<h1>hello world!</h1>`)
})

app.listen(3000, () => {
  console.log('App is runnung on http://localhost:3000.')
})