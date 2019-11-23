describe('$values', () => {

  it('should validate', async () => {
    const schema = {
      prop: {
        $values: [1, 2]
      }
    };
    assert.deepStrictEqual(validate(schema, {prop: 1}), []);
    assert.deepStrictEqual(validate(schema, {prop: null}), []);
    assert.deepStrictEqual(validate(schema, {prop: undefined}), []);
    assert.deepStrictEqual(validate(schema, {prop: '1'}), [
      {
        validator: '$values',
        path: 'prop',
        value: '1',
        values: [1, 2],
      }
    ]);
    assert.deepStrictEqual(validate(schema, {prop: 3}), [
      {
        validator: '$values',
        path: 'prop',
        value: 3,
        values: [1, 2],
      }
    ]);
  });

});
