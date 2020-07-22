import express from 'express';
import signupController from '../controllers';

const { Router } = express;
const { signup } = signupController;

const api = Router();

/**
 * @swagger
 * /api/signup/:
 *   post:
 *     tags: ["Signup"]
 *     description: Creates a new person and returns JWT token
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/signup'
 */
api.post('/', signup.signupUser);

export default api;
