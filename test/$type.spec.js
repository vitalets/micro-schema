describe('$type', () => {

  it('explicit', async () => {
    const schema = {
      prop: {
        $type: 'boolean'
      }
    };
    assert.deepStrictEqual(validate(schema, {prop: true}), []);
    assert.deepStrictEqual(validate(schema, {prop: null}), []);
    assert.deepStrictEqual(validate(schema, {prop: undefined}), []);
    assert.deepStrictEqual(validate(schema, {prop: 42}), [
      {
        validator: '$type',
        path: 'prop',
        expectedType: 'boolean',
        actualType: 'number',
      }
    ]);
  });

  it('implicit object type', async () => {
    const schema = {
      prop: {
        value: { }
      }
    };
    assert.deepStrictEqual(validate(schema, {prop: {}}), []);
    assert.deepStrictEqual(validate(schema, {prop: 42}), [
      {
        validator: '$type',
        path: 'prop',
        expectedType: 'object',
        actualType: 'number',
      }
    ]);
  });

  it('implicit array type', async () => {
    const schema = {
      prop: []
    };
    assert.deepStrictEqual(validate(schema, {prop: [42]}), []);
    assert.deepStrictEqual(validate(schema, {prop: 42}), [
      {
        validator: '$type',
        path: 'prop',
        expectedType: 'array',
        actualType: 'number',
      }
    ]);
  });

});
