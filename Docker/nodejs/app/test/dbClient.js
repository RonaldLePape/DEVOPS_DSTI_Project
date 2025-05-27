const { expect } = require('chai');
let db;

describe('PostgreSQL', () => {

  before(() => {
    db = require('../src/dbClient'); // your pg Pool
  });

  it('should connect to PostgreSQL', async () => {
    const result = await db.query('SELECT 1');
    expect(result.rowCount).to.equal(1);
  });

});

