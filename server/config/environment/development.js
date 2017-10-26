'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/itrapp-dev'
  },

  // Postgres connection options
  postgres: {
    uri: process.env.POSTGRES_URL ||
         'postgres://user:pass@localhost:5432/itrapp'
  },
  database: 'test',
  username: 'postgres',
  password: 'root',
  seedDB: true
};
