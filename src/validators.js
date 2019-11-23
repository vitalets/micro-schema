/**
 * Validators.
 */
module.exports = {
  $type: (type, value) => {
    if (value === undefined || value === null) {
      return;
    }

    if (type === 'array' && Array.isArray(value)) {
      return;
    }

    const valueType = typeof value;
    if (valueType !== type) {
      return {
        expectedType: type,
        actualType: valueType,
      };
    }
  },

  $required: (required, value) => {
    if (required && (value === undefined || value === null)) {
      return { };
    }
  },

  $maxLength: (maxLength, value) => {
    if (value && value.length > maxLength) {
      return {
        length: value.length,
        maxLength,
      };
    }
  },

  $values: (values, value) => {
    if (value === undefined || value === null) {
      return;
    }

    if (!values.includes(value)) {
      return {
        values,
        value,
      };
    }
  },

  $unknownKeys: (unknownKeys, value, { keys }) => {
    if (!unknownKeys && value && typeof value === 'object') {
      return Object.keys(value).map(key => {
        if (!keys.includes(key)) {
          return {
            path: [key]
          };
        }
      });
    }
  },

};
