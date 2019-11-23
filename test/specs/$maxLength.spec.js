describe('$maxLength', () => {

  it('string', async () => {
    const schema = {
      prop: {
        $type: 'string',
        $maxLength: 2,
      }
    };
    assert.deepStrictEqual(validate(schema, {prop: 'a'}), []);
    assert.deepStrictEqual(validate(schema, {prop: 'ab'}), []);
    assert.deepStrictEqual(validate(schema, {prop: null}), []);
    assert.deepStrictEqual(validate(schema, {prop: undefined}), []);
    assert.deepStrictEqual(validate(schema, {prop: 'abc'}), [
      {
        validator: '$maxLength',
        path: 'prop',
        maxLength: 2,
        length: 3,
      }
    ]);
  });

  it('array', async () => {
    const schema = {
      prop: {
        $type: 'array',
        $maxLength: 2,
      }
    };
    assert.deepStrictEqual(validate(schema, {prop: [1]}), []);
    assert.deepStrictEqual(validate(schema, {prop: [1, 2]}), []);
    assert.deepStrictEqual(validate(schema, {prop: [1, 2, 3]}), [
      {
        validator: '$maxLength',
        path: 'prop',
        maxLength: 2,
        length: 3,
      }
    ]);
  });
});
