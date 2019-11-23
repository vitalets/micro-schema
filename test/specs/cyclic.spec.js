describe.skip('cyclic', () => {

  it('throw on cyclic refs', async () => {
    const schema = {
      prop: {
        $type: 'number',
      }
    };
    const obj = { foo: 42 };
    obj.prop = obj;
    validate(schema, obj);
  });

});
