const Koa = require('koa')
const router = require('./router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())

app.on('error', err => {
  console.error(err)
})

const port = process.env.PORT || 6666
app.listen(port)

console.log('mock server started at http://localhost:' + port)
