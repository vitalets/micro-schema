/**
 * Compile schema.
 */
const validators = require('./validators');

/**
 * Special validator $keys
 */
const $SPECIAL_VALIDATORS = [
  '$item',
  '$compiled',
];

/**
 * Recursively compiles scheme.
 *
 * @param {object} schema
 */
exports.compile = schema => {
  if (!schema.$compiled) {
    compile(schema);
    schema.$compiled = true;
  }
  return schema;
};

/**
 * Returns schema $keys and keys
 *
 * @param {object} schema - compiled schema
 * @returns {{$keys, keys}}
 */
exports.getKeys = schema => getKeys(schema);

const compile = (schema, $defaults = {}) => {
  const {keys} = getKeys(schema);

  setTypeForObjectSchema(schema, keys);
  expandPrimitiveKeys(schema, keys);
  expandArrayKeys(schema, keys);

  $defaults = getMergedDefaults(schema, $defaults);
  applyDefaults(schema, $defaults);

  assertValidatorKeys(schema);

  if (schema.$item) {
    compile(schema.$item, $defaults);
  }

  // Recursively compile children
  keys.forEach(key => compile(schema[key], $defaults));
};

const isValidatorKey = key => {
  return key.startsWith('$');
};

const getKeys = schema => {
  const allKeys = Object.keys(schema);

  const $keys = allKeys
    .filter(key => isValidatorKey(key))
    .filter(key => !$SPECIAL_VALIDATORS.includes(key));

  const keys = allKeys
    .filter(key => !isValidatorKey(key))
    // ignore null and undefined in schema
    .filter(key => schema[key] !== null && schema[key] !== undefined);

  return {$keys, keys};
};

const assertValidatorKeys = schema => {
  const {$keys} = getKeys(schema);
  $keys.forEach($key => {
    if (!validators[$key]) {
      throw new Error(`Unknown validator: ${$key}`);
    }
  });
};

const setTypeForObjectSchema = (schema, keys) => {
  if (!schema.$type && keys.length > 0) {
    schema.$type = 'object';
  }
};

const expandPrimitiveKeys = (schema, keys) => {
  keys.forEach(key => {
    const value = schema[key];
    if (typeof value !== 'object') {
      schema[key] = {
        $type: typeof value,
        $required: true,
        $values: [value]
      };
    }
  });
};

const expandArrayKeys = (schema, keys) => {
  keys.forEach(key => {
    const value = schema[key];
    if (Array.isArray(value)) {
      schema[key] = {
        $type: 'array',
        $item: value[0]
      };
    }
  });
};

const getMergedDefaults = (schema, $defaults) => {
  const $mergedDefaults = Object.assign({}, $defaults, schema.$defaults);
  delete schema.$defaults;
  return $mergedDefaults;
};

const applyDefaults = (schema, $defaults) => {
  Object.keys($defaults).forEach($key => {
    if (!isValidatorKey($key)) {
      throw new Error(`$defaults can only contain keys with $. Got: ${$key}`);
    }
    if (!schema.hasOwnProperty($key)) {
      schema[$key] = $defaults[$key];
    }
  });
};
