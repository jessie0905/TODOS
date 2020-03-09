const Koa = require('koa')
const app = new Koa()

const bodyParser = require('koa-bodyparser')

app.use(bodyParser())
const router = require('./router')

app.use(router.routes())

app.on('error', (err, ctx) => {
	console.error('server error', err);
});

app.listen(3000)
console.log("服务器启动成功")