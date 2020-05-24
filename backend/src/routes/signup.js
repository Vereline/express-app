import express from 'express';
import demoController from '../controllers';

const { Router } = express;
const { demo } = demoController;

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
api.post('/', demo.hi);

export default api;
