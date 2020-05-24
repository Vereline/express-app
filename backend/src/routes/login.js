import express from 'express';
import demoController from '../controllers';

const { Router } = express;
const { demo } = demoController;

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
api.post('/', demo.hi);

export default api;
