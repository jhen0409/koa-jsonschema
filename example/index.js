const bodyParser = require('koa-bodyparser');
const schema = require('..');
const Koa = require('koa');

const app = new Koa();
app.use(bodyParser());
app.use((ctx, next) => {
  next().catch(e => {
    if (e.message === 'JSONSchema errors') {
      ctx.body = ctx.schemaErrors;
    }
  });
});
app.use(schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'string' },
  },
  required: ['a', 'b'],
}));
app.use(ctx => {
  ctx.body = ctx.request.body;
});

app.listen(3000);
