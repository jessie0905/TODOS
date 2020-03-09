const client = require('./config/database');
const Router = require('koa-router')
const router = new Router()
const todos = require('./controller/todos')

router
.get('/api', todos.getData)
.get('/api/remove', todos.remove)
.get('/api/change', todos.change)
.get('/api/changeAll', todos.changeAll)
.post('/api',todos.create)

module.exports = router