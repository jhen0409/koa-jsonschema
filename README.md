# Koa JSONSchema

[![Build Status](https://travis-ci.org/jhen0409/koa-jsonschema.svg)](https://travis-ci.org/jhen0409/koa-jsonschema)
[![NPM version](http://img.shields.io/npm/v/koa-jsonschema.svg?style=flat)](https://www.npmjs.com/package/koa-jsonschema)
[![Dependency Status](https://david-dm.org/jhen0409/koa-jsonschema.svg)](https://david-dm.org/jhen0409/koa-jsonschema)
[![devDependency Status](https://david-dm.org/jhen0409/koa-jsonschema/dev-status.svg)](https://david-dm.org/jhen0409/koa-jsonschema#info=devDependencies)

> A Koa middleware for validate JSONSchema

## Installation

```bash
$ npm install --save koa-bodyparser@3 koa-jsonschema
```

## Usage

```js
const bodyParser = require('koa-bodyparser');
const schema = require('koa-jsonschema');
const koa = require('koa');

const app = new koa();
app.use(bodyParser());
app.use((ctx, next) => {
  next().catch(e => {
    if (e.message === 'JSONSchema errors') {
      // If validation errors, errors will store in `ctx.schemaErrors`.
      ctx.body = ctx.schemaErrors;
    }
  });
});
app.use(schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'string' }
  },
  required: ['a', 'b']
}));
app.use(function(ctx, next) {
  ctx.body = ctx.request.body;
});

app.listen(3000);
```

If you're still using `koa@1`, use `.legacy` for koa 1.0 middleware.

```js
const schema = require('koa-jsonschema').legacy;
```

## `schema` function arguments

#### `schema` Object

Refer to [JSONSchema documentation](http://json-schema.org/documentation.html) for made schema.

#### `validator` The [JSONSchema](https://github.com/tdegrunt/jsonschema) validator

Can be null, it means you can customize it. ([see this example](example/custom.js))  
It will validate `ctx.request.body`, so you should use `koa-bodyparser` middleware.  
If validation errors, errors will store in `ctx.schemaErrors`.

#### `pass` Boolean

Ignore the error and pass middleware.

## License

[MIT](LICENSE)
