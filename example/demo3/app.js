// 说明中间件的执行顺序

const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const json = require('koa-json')
const staticServer = require('koa-static')
const historyApiFallback = require('koa-connect-history-api-fallback')
const app = new Koa()



app.use(async function(ctx, next){
  console.log(`Process ${ctx.method} ${ctx.url}`)
  await next()
})

// get请求
router.get('/', async (ctx, next) => {
  ctx.body = '<h1>Index Router</h1>'
})

router.get('/hello/:name', async (ctx, next) => {
  const name = ctx.params.name
  ctx.body = `<h1>Hello, ${name}</h1>`
})

// post请求

router.get('/form', async (ctx, next) => {
  ctx.body = '<h1>form</h1>' +
  '<form action="/signin" method="post"> <p>Name: <input name="name" value="koa"></p><p>Password: <input name="password" type="password"></p><p><input type="submit" value="Submit"></p></form>';
})

router.post('/signin', async (ctx, next) => {
  const name = ctx.request.body.name || ''
  const pwd = ctx.request.body.password || ''
  console.log(`signin with name: ${name}, password: ${pwd}`)
  if(name === 'koa' && pwd === '123456'){
    ctx.body = `<h1>Welcome, ${name}</h1>`
  } else {
    ctx.body = '<h1>Login failed!</h1><p><a href="/form">Try again</a></p>'
  }
})

// 返回的json的格式化
router.get('/json', async (ctx, next) => {
  ctx.body = {foo: 'bar'}
})

/*// 会重定向所有的路由到index.html文件
app.use(convert(historyApiFallback()))*/

// 把post请求的body设置在ctx.request.body上，应用这个中间的顺序要放在koa-router之上
app.use(convert(bodyParser()))
// 设置静态文件目录
app.use(convert(json({pretty: false, param: 'pretty', spaces: 2})))
app.use(convert(staticServer('.')))
app.use(router.routes())

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
