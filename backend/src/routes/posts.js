import express from 'express';
import demoController from '../controllers';

const { Router } = express;
const { demo } = demoController;

const api = Router();

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags: ["Posts"]
 *     description: Returns list of existing posts
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/posts'
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.get('/', demo.hi);

export default api;
