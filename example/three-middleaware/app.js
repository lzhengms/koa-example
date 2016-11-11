// koa的中间件支持3种方式

const Koa = require('koa')
const app = new Koa()
const co = require('co')
const convert = require('koa-convert')

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

// generator function, 把koa1的中间件，一个参数；转成koa2的中间件
app.use(convert(function* (next){
     console.log('generator function2')
     yield next
})
);

// common function
app.use(ctx => {
  console.log('common function2')
  ctx.body = 'three function'
});


// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
