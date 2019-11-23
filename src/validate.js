/**
 * Micro-schema JSON validator
 */
const validators = require('./validators');
const {compile, getKeys} = require('./compile');

module.exports = (schema, object) => {
  if (!schema.$compiled) {
    compile(schema);
  }
  return validate(schema, object, []);
};

const validate = (schema, value, path = []) => {
  const {keys, $keys} = getKeys(schema);

  const errors = [];

  // validate value by $keys
  $keys.forEach($key => {
    const validatorFn = validators[$key];
    const result = validatorFn(schema[$key], value);
    errors.push(createError($key, path, result));
  });

  // validate all items for array
  if (schema.$item && Array.isArray(value)) {
    value.forEach((item, index) => {
      const itemPath = path.concat([index]);
      const results = validate(schema.$item, item, itemPath);
      errors.push(...results);
    });
  }

  // validate all sub objects
  if (value && typeof value === 'object') {
    keys.forEach(key => {
      const keyPath = path.concat([key]);
      const results = validate(schema[key], value[key], keyPath);
      errors.push(...results);
    });
  }

  return errors.filter(Boolean);
};

/**
 * Creates error object.
 *
 * @param {string} $key
 * @param {array} path
 * @param {object} result
 */
const createError = ($key, path, result) => {
  if (result) {
    return {
      validator: $key,
      path: path.join('.'),
      ...(typeof result === 'object' ? result : {}),
    };
  }
};
