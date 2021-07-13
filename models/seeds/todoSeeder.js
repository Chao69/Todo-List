const db = require('../../config/mongoose')
const Todo = require('../todo')

// db connect succeed tips
db.once('open', () => {
  for (i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }

  console.log('done')
})