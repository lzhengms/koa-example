// 说明中间件的执行顺序

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    console.log('first')
    const result = await new Promise((resolve, reject) => {
      console.log('s')
      resolve(false)
    })
    console.log('result', result)
    await next(); // 调用下一个middleware
    console.log('fifth')
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    console.log('second')
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log('fourth')
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx, next) => {
    await next();
    console.log('third')
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, middleware!</h1>';
});

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
