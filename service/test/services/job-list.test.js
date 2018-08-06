const assert = require('assert');
const app = require('../../src/app');

describe('\'job-list\' service', () => {
  it('registered the service', () => {
    const service = app.service('job-list');

    assert.ok(service, 'Registered the service');
  });
});
