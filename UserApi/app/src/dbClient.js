const { Pool } = require('pg');
const configure = require('./configure');

const config = configure();

// Setup PostgreSQL connection pool
const db = new Pool({
  host: config.localhost?.host || 'postgres',
  port: config.localhost?.port || 5432,
  user: config.localhost?.user || 'myuser',
  password: config.localhost?.password || 'MySecretPassword123',
  database: config.localhost?.database || 'myproject_db'
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await db.end();
  console.log('PostgreSQL connection closed.');
  process.exit(0);
});

module.exports = db;
