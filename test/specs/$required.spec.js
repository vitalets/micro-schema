describe('$required', () => {

  it('true', async () => {
    const schema = {
      prop: {
        $required: true
      }
    };
    const error = {
      validator: '$required',
      path: 'prop',
    };
    assert.deepStrictEqual(validate(schema, {prop: 42}), []);
    assert.deepStrictEqual(validate(schema, {}), [error]);
    assert.deepStrictEqual(validate(schema, {prop: null}), [error]);
    assert.deepStrictEqual(validate(schema, {prop: undefined}), [error]);
  });

  it('false', async () => {
    const schema = {
      prop: {
        $required: false
      }
    };
    assert.deepStrictEqual(validate(schema, {}), []);
    assert.deepStrictEqual(validate(schema, {prop: 42}), []);
    assert.deepStrictEqual(validate(schema, {prop: null}), []);
    assert.deepStrictEqual(validate(schema, {prop: undefined}), []);
  });

  it('false (by default)', async () => {
    const schema = {
      prop: { }
    };
    assert.deepStrictEqual(validate(schema, {}), []);
    assert.deepStrictEqual(validate(schema, {prop: 42}), []);
  });

});
