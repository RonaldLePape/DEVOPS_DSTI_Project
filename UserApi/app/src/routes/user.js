const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

/**
 * @swagger
 * /user/addUser:
 *   post:
 *     tags:
 *       - Business
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstname
 *               - lastname
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
userRouter.post('/addUser/', (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })


/**
 * @swagger
 * /user/getUser/{username}:
 *   get:
 *     tags:
 *       - Business
 *     summary: Retrieve a user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username of the user
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *       404:
 *         description: User not found
 */
userRouter.get('/getUser/:username', (req, resp, next) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    const username = req.params.username
    userController.get(username, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(200).json(respObj)
    })
  })

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     tags:
 *       - Business
 *     summary: Retrieve all the users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type: string
 *       404:
 *         description: No users found
 */
userRouter.get('/getAll', (req, resp, next) => {
  userController.getAll((err, res) => {
    if (err) {
      //console.log("ERROR message:", err.message); // 👈 Add this
      return resp.status(400).json({
        status: "error",
        msg: err.message
      });
    }

    //console.log("SUCCESS:", res); // 👈 Add this too
    return resp.status(200).json({
      status: "success",
      msg: res
    });
  });
})



/**
 * @swagger
 * /user/deleteUser:
 *   post:
 *     tags:
 *       - Business
 *     summary: Delete a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       201:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid input
 */
userRouter.post('/deleteUser/', (req, resp) => {
    userController.delete(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })


/**
 * @swagger
 * /user/updateUser:
 *   post:
 *     tags:
 *       - Business
 *     summary: Update a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstname
 *               - lastname
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *     responses:
 *       201:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 */
userRouter.post('/updateUser/', (req, resp) => {
    userController.update(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })

module.exports = userRouter
