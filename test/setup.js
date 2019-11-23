const chai = require('chai');
const {validate} = require('../');

chai.config.truncateThreshold = 0;

Object.assign(global, {
  assert: chai.assert,
  validate,
});
