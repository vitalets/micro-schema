# micro-schema
[![Actions Status](https://github.com/vitalets/micro-schema/workflows/autotests/badge.svg)](https://github.com/vitalets/micro-schema/actions)
[![npm](https://img.shields.io/npm/v/@vitalets/micro-schema.svg)](https://www.npmjs.com/package/@vitalets/micro-schema)
[![license](https://img.shields.io/npm/l/@vitalets/micro-schema.svg)](https://www.npmjs.com/package/@vitalets/micro-schema)

Minimal JSON schema validation format.

## Contents

<!-- toc -->

- [Motivation](#motivation)
- [Example](#example)
- [Validators](#validators)
    + [$type](#type)
    + [$required](#required)
    + [$maxLength](#maxlength)
    + [$minLength](#minlength)
    + [$values](#values)
    + [$unknownKeys](#unknownkeys)
    + [$item](#item)
- [Shortcuts](#shortcuts)
    + [primitive](#primitive)
    + [array](#array)
- [Custom validators](#custom-validators)
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
{
  "productId": {
    "$type": "number",
    "$required": true
  },
  "productName": {
    "$type": "string",
    "$required": true,
    "$maxLength": 255
  },
  "tags": [{
      "$type": "string"
  }]
}
```
Valid object:
```json
{
  "productId": 1,
  "productName": "iphone 11",
  "tags": [ "mobile", "phone" ]
}
```

Invalid object:
```json
{
  "productId": "1",
  "productName": null,
  "tags": [ 42 ]
}
```

Validation output:
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

## Validators
tbd.

#### $type
#### $required
#### $maxLength
#### $minLength
#### $values
#### $unknownKeys
#### $item

## Shortcuts
#### primitive
#### array

## Custom validators

## Implementations

### Javascript

#### Installation
```bash
npm install @vitalets/micro-schema
```

#### Usage
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

3. validate object:
    ```js
    const object = {
      productId: 1,
      productName: 'iphone 11',
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
