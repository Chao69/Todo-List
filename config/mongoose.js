const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

// db connect fail tips
db.on('error', () => {
  console.log('mongodb error!')
})

// db connect succeed tips
db.once('open', () => {
  console.log('mongodb connected!')
})

module.export = db