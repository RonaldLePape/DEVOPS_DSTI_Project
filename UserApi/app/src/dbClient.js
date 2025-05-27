const { Pool } = require('pg');
const configure = require('./configure');

const config = configure();

// Setup PostgreSQL connection pool
const db = new Pool({
  host: config.postgres?.host || 'postgres',
  port: config.postgres?.port || 5432,
  user: config.postgres?.user || 'myuser',
  password: config.postgres?.password || 'MySecretPassword123',
  database: config.postgres?.database || 'myproject_db'
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await db.end();
  console.log('PostgreSQL connection closed.');
  process.exit(0);
});

module.exports = db;
