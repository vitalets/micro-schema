# micro-schema
[![Actions Status](https://github.com/vitalets/micro-schema/workflows/autotests/badge.svg)](https://github.com/vitalets/micro-schema/actions)
[![npm](https://img.shields.io/npm/v/@vitalets/micro-schema.svg)](https://www.npmjs.com/package/@vitalets/micro-schema)
[![license](https://img.shields.io/npm/l/@vitalets/micro-schema.svg)](https://www.npmjs.com/package/@vitalets/micro-schema)

JavaScript implementation of [JSON micro schema](https://github.com/vitalets/json-micro-schema) validation format.

## Contents

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

<!-- tocstop -->

## Installation
```bash
npm install @vitalets/micro-schema
```

## Usage
1. Require `validate` function:
    ```js
    const { validate } = require('@vitalets/micro-schema');
    ```

2. Define schema:
    ```js
    const schema = {
      productId: {
        $type: 'number',
        $required: true
      },
      productName: {
        $type: 'string',
        $required: true,
        $maxLength: 255
      },
      tags: [{
        $type: 'string'
      }]
    };
    ```

3. Validate object:
    ```js
    const object = {
      productId: '1',
      productName: undefined,
      tags: [42]
    };
    
    const errors = validate(schema, object);
    ```

4. Handle validation errors:
    ```json
    [
      {
        "validator": "$type",
        "path": "productId",
        "expectedType": "number",
        "actualType": "string"
      },
      {
        "validator": "$required",
        "path": "productName"
      },
      {
        "validator": "$type",
        "path": "tags.0",
        "expectedType": "string",
        "actualType": "number"
      }
    ]
    ```
 
## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)
