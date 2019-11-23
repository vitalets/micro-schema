describe('compile', () => {

  it('compile schema (with nested)', async () => {
    const schema = {
      prop: {
        $required: false,
      }
    };
    validate(schema, {});
    assert.deepEqual(schema, {
      $compiled: true,
      $type: 'object',
      prop: {
        $required: false,
      }
    });
  });

  it('compile array', async () => {
    const schema = {
      prop: [
        { $required: false }
      ]
    };
    validate(schema, {});
    assert.deepEqual(schema, {
      $compiled: true,
      $type: 'object',
      prop: {
        $type: 'array',
        $item: {
          $required: false
        }
      }
    });
  });

  it('compile primitive', async () => {
    const schema = {
      prop: 42
    };
    validate(schema, {});
    assert.deepEqual(schema, {
      $compiled: true,
      $type: 'object',
      prop: {
        $type: 'number',
        $required: true,
        $values: [42],
      }
    });
  });

  it('compile defaults', async () => {
    const schema = {
      $defaults: {
        $required: true
      },
      prop: {},
      prop2: {
        $required: false
      }
    };
    validate(schema, {});
    assert.deepEqual(schema, {
      $compiled: true,
      $type: 'object',
      $required: true,
      prop: {
        $required: true,
      },
      prop2: {
        $required: false,
      }
    });
  });

  it('unknown validator', async () => {
    const schema = {
      prop: {
        $foo: 'bar',
      }
    };
    assert.throws(() => validate(schema, {}), /Unknown validator: \$foo/);
  });
});
