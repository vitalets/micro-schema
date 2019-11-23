describe('$unknownKeys', () => {

  it('true', async () => {
    const schema = {
      prop: {
        $unknownKeys: true,
        foo: {}
      }
    };
    const obj = {
      prop: {
        foo: 42,
        bar: 'a'
      }
    };
    assert.deepStrictEqual(validate(schema, obj), []);
  });

  it('false', async () => {
    const schema = {
      prop: {
        $unknownKeys: false,
        foo: {}
      }
    };
    const obj = {
      prop: {
        foo: 42,
        bar: 'a'
      }
    };
    assert.deepStrictEqual(validate(schema, obj), [
      {
        validator: '$unknownKeys',
        path: 'prop.bar',
      }
    ]);
  });

});
