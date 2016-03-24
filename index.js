const Validator = require('jsonschema').Validator;

const defaultValidator = new Validator();

const koaSchema = (schema, validator, pass) => {
  const v = validator || defaultValidator;

  return (ctx, next) => {
    const data = ctx.request.body;
    const result = v.validate(data, schema);
    if (result.errors.length) {
      ctx.schemaErrors = result.errors;
      if (pass) {
        return next();
      }
      return Promise.reject(new Error('JSONSchema errors'));
    }
    return next();
  };
};

koaSchema.legacy = (schema, validator, pass) => {
  const v = validator || defaultValidator;

  return function* (next) {
    const data = this.request.body;
    const result = v.validate(data, schema);
    if (result.errors.length) {
      this.schemaErrors = result.errors;
      if (pass) {
        yield next;
      }
      throw new Error('JSONSchema errors');
    }
    yield next;
  };
};

module.exports = koaSchema;
