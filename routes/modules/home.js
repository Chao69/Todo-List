const express = require('express')
const router = express.Router()
const Todo = require('../../models/todo')


// define 根目錄 static view
router.get('/', (req, res) => {
  // 取得所有Todo資料
  Todo.find()
    .lean()
    .sort({ name: 'asc' }) //正序：'asc'; 反序：'desc'
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

module.exports = router