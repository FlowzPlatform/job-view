const jobList = require('./job-list/job-list.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(jobList);
};
