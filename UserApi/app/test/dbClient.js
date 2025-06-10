const { expect } = require('chai');
const { Pool } = require('pg');
const config = require('../src/configure'); // make sure this file exports config.postgres

let db;

describe('PostgreSQL', () => {

  before(() => {
    db = new Pool({
      host: config.postgres?.host || 'localhost',
      port: config.postgres?.port || 5432,
      user: config.postgres?.user || 'myuser',
      password: config.postgres?.password || 'MySecretPassword123',
      database: config.postgres?.database || 'myproject_db'
    });
  });

  after(async () => {
    await db.end(); // Clean up DB pool after tests
  });

  it('should connect to PostgreSQL', async () => {
    const result = await db.query('SELECT 1');
    expect(result.rowCount).to.equal(1);
  });

});

