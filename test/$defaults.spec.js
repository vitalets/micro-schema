describe('$defaults', () => {

  it('on first level', async () => {
    const schema = {
      $defaults: {
        $required: true,
      },
      prop: { },
    };
    assert.deepStrictEqual(validate(schema, {prop: 42}), []);
    assert.deepStrictEqual(validate(schema, {}), [
      {
        validator: '$required',
        path: 'prop',
      }
    ]);
  });

  it('on nested level', async () => {
    const schema = {
      $defaults: {
        $required: true,
      },
      prop: {
        foo: {}
      },
    };
    assert.deepStrictEqual(validate(schema, {prop: {foo: 42}}), []);
    assert.deepStrictEqual(validate(schema, {prop: {}}), [
      {
        validator: '$required',
        path: 'prop.foo',
      }
    ]);
  });
});
