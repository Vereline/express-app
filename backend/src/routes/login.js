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
 *     responses:
 *       201:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/login'
 */
api.post('/', login.loginUser);

export default api;
