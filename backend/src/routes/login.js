import express from 'express';
import loginController from '../controllers';

const { Router } = express;
const { login } = loginController;

const api = Router();

/**
 * @swagger
 * /api/login/:
 *   post:
 *     tags: ["Login"]
 *     description: Returns authentication token
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: post
 *        in: body
 *        description: Body for log in
 *        required: true
 *        schema:
 *          $ref: '#/definitions/login'
 *     responses:
 *       201:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/login'
 */
api.post('/', login.loginUser);

/**
 * @swagger
 * /api/login/token/:
 *   post:
 *     tags: ["Login"]
 *     description: Check if token is valid
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.post('/token', login.verifyToken);

export default api;
