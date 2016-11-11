// koa的中间件支持3种方式

const Koa = require('koa')
const app = new Koa()
const co = require('co')

// async function
app.use(async (ctx, next) => {
     console.log('async function')
     await next()
});

app.use((ctx,next) => {
  console.log('common function')
  next()
});

// generator function
app.use(co.wrap(function* (ctx, next){
     console.log('generator function')
     yield next()
})
);

// common function
app.use(ctx => {
  console.log('common function')
  ctx.body = 'three function'
});


// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
