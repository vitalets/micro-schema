# micro-schema
[![Actions Status](https://github.com/vitalets/micro-schema/workflows/autotests/badge.svg)](https://github.com/vitalets/micro-schema/actions)
[![npm](https://img.shields.io/npm/v/micro-schema.svg)](https://www.npmjs.com/package/micro-schema)
[![license](https://img.shields.io/npm/l/micro-schema.svg)](https://www.npmjs.com/package/micro-schema)

Minimal JSON schema validation format.

## Contents

<!-- toc -->

- [Motivation](#motivation)
- [Example](#example)
- [Keywords](#keywords)
- [Implementations](#implementations)
  * [Javascript](#javascript)
    + [Installation](#installation)
    + [Usage](#usage)
- [License](#license)

<!-- tocstop -->

## Motivation
Although [JSON Schema](https://json-schema.org/) is old and mature project
I found it too complex and verbose for simple JSON validation. 
Instead, I tried to create a very simple format for the most common cases.

## Example
Schema:
```json

```
Valid object:
```json

```

Invalid object:
```json

```

Validation result:
```json

```

## Keywords

## Implementations

### Javascript

#### Installation
```bash
npm install micro-schema
```

#### Usage
1. Require `validate` function:
    ```js
    const { validate } = require('micro-schema');
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

3. validate object:
    ```js
    const object = {
      productId: 1,
      productName: 'IPhone 11',
      tags: ['mobile', 'phone']
    };
    
    const errors = validate(schema, object);
    // => []
    ```

4. For invalid object the result contains array of errors:
    ```js
    const object = {
      productId: '1',
      productName: undefined,
      tags: [42]
    };
    
    validate(schema, object);
    /*
    
    */
    ```

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)
