const mongoose = require('mongoose')
const Todo = require('../todo')

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

  for (i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}`})
  }
  
  console.log('done')
})