const Validator = require('jsonschema').Validator;
const isPlugin = require('jsonschema-is-js');
const customValidator = new Validator();

customValidator.attributes.is = isPlugin();

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
    address: { type: 'string', is: 'email' },
  },
  required: ['a', 'b'],
}, customValidator));
app.use(ctx => {
  ctx.body = ctx.request.body;
});

app.listen(3000);
