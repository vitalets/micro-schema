describe('$item', () => {

  it('defined as $item: schema', async () => {
    const schema = {
      prop: {
        $type: 'array',
        $item: {
          $type: 'number'
        }
      }
    };
    assert.deepStrictEqual(validate(schema, {prop: []}), []);
    assert.deepStrictEqual(validate(schema, {prop: [1, 2]}), []);
    assert.deepStrictEqual(validate(schema, {prop: [1, '2']}), [
      {
        validator: '$type',
        path: 'prop.1',
        expectedType: 'number',
        actualType: 'string',
      }
    ]);
  });

  it('defined as [$item]', async () => {
    const schema = {
      prop: [
        {$type: 'number'}
      ]
    };
    assert.deepStrictEqual(validate(schema, {prop: []}), []);
    assert.deepStrictEqual(validate(schema, {prop: [1, 2]}), []);
    assert.deepStrictEqual(validate(schema, {prop: [1, '2']}), [
      {
        validator: '$type',
        path: 'prop.1',
        expectedType: 'number',
        actualType: 'string',
      }
    ]);
  });
});
