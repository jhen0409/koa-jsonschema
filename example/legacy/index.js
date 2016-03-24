const bodyParser = require('koa-bodyparser');
const schema = require('../..').legacy;
const Koa = require('koa');

const app = new Koa();
app.use(bodyParser());
app.use(function* (next) {
  try {
    yield next;
  } catch (e) {
    if (e.message === 'JSONSchema errors') {
      this.body = this.schemaErrors;
    }
  }
});
app.use(schema(null, {
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'string' },
  },
  required: ['a', 'b'],
}));
app.use(function* () {
  this.body = this.request.body;
});

app.listen(3000);
