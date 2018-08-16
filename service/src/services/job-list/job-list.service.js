// Initializes the `job-list` service on path `/job-list`
const createService = require('./job-list.class.js');
const hooks = require('./job-list.hooks');
const filters = require('./job-list.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'job-list',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/job-list', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('job-list');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
