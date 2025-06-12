const express = require('express');
const db = require('../dbClient');

const healthRouter = express.Router();

/**
 * @swagger
 * /health/healthcheck:
 *   get:
 *     summary: Health check of the application and database
 *     description: Returns 200 OK if the app and database are reachable.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: App is healthy and connected to the DB
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 db:
 *                   type: string
 *                   example: connected
 *       500:
 *         description: App is unhealthy or DB is unreachable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 db:
 *                   type: string
 *                   example: disconnected
 */
healthRouter.get('/healthcheck', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.status(200).json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected' });
  }
});

module.exports = healthRouter;
