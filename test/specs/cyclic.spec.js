describe('cyclic object', () => {

  it('work well on cyclic refs', async () => {
    const schema = {
      prop: {
        $type: 'object',
      }
    };
    const obj = { foo: 42 };
    obj.prop = obj;
    assert.deepStrictEqual(validate(schema, obj), []);
  });

});
