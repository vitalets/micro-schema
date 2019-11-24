describe('$minLength', () => {

  it('string', async () => {
    const schema = {
      prop: {
        $type: 'string',
        $minLength: 2,
      }
    };
    assert.deepStrictEqual(validate(schema, {prop: 'abc'}), []);
    assert.deepStrictEqual(validate(schema, {prop: 'ab'}), []);
    assert.deepStrictEqual(validate(schema, {prop: null}), []);
    assert.deepStrictEqual(validate(schema, {prop: undefined}), []);
    assert.deepStrictEqual(validate(schema, {prop: 'a'}), [
      {
        validator: '$minLength',
        path: 'prop',
        minLength: 2,
        length: 1,
      }
    ]);
  });

  it('array', async () => {
    const schema = {
      prop: {
        $type: 'array',
        $minLength: 2,
      }
    };
    assert.deepStrictEqual(validate(schema, {prop: [1, 2, 3]}), []);
    assert.deepStrictEqual(validate(schema, {prop: [1, 2]}), []);
    assert.deepStrictEqual(validate(schema, {prop: [1]}), [
      {
        validator: '$minLength',
        path: 'prop',
        minLength: 2,
        length: 1,
      }
    ]);
  });
});
