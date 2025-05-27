const db = require('../dbClient'); // PostgreSQL client (pg.Pool)

module.exports = {
  /**
   * Create a new user.
   * @param {Object} user - User object with username, firstname, lastname
   * @param {Function} callback - Node-style callback (err, result)
   */
  create: async (user, callback) => {
    if (!user.username || !user.firstname || !user.lastname) {
      return callback(new Error("Wrong user parameters"), null);
    }

    try {
      // Optional: check if the user already exists
      const check = await db.query('SELECT 1 FROM users WHERE username = $1', [user.username]);
      if (check.rowCount > 0) {
        return callback(new Error("User already exists"), null);
      }

      // Insert new user
      const result = await db.query(
        'INSERT INTO users (username, firstname, lastname) VALUES ($1, $2, $3) RETURNING *',
        [user.username, user.firstname, user.lastname]
      );

      callback(null, result.rows[0]); // return the inserted user
    } catch (err) {
      callback(err, null);
    }
  },

  /**
   * Get a user by username.
   * @param {string} username - The username to retrieve
   * @param {Function} callback - Node-style callback (err, user)
   */
  get: async (username, callback) => {
    if (!username) {
      return callback(new Error("Username is required"), null);
    }

    try {
      const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

      if (result.rowCount === 0) {
        return callback(new Error("User not found"), null);
      }

      callback(null, result.rows[0]); // return the found user
    } catch (err) {
      callback(err, null);
    }
  },

/**
 * Delete a user by username
 * @param {string} username - The username to retrieve
 */
  delete: async (username, callback) => {
    if (!username) {
      return callback(new Error("Username is required"), null);
    }

    try {
      const result = await db.query('DELETE FROM users WHERE username = $1 RETURNING *', [username]);

      if (result.rowCount === 0) {
        return callback(new Error("User not found"), null);
      }

      callback(null, { status: 'deleted', user: result.rows[0] });
    } catch (err) {
      callback(err, null);
    }
  }
};

