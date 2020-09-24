import express from 'express';
import socialController from '../controllers';

const { Router } = express;
const { social } = socialController;

const api = Router();

/**
 * @swagger
 * /api/social/github:
 *   post:
 *     tags: ["Social"]
 *     description: Login with OAuth via github application
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: post
 *        in: body
 *        description: Body for signing up
 *        required: true
 *        schema:
 *          $ref: '#/definitions/signup'
 *     responses:
 *       201:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/signup'
 */
api.post('/github', social.loginGithub);


/**
 * @swagger
 * /api/social/github/callback:
 *   post:
 *     tags: ["Social"]
 *     description: Login callback with OAuth via github application
 *     produces:
 *      - application/json
 *     parameters:
 *      - name: post
 *        in: body
 *        description: Body for signing up
 *        required: true
 *        schema:
 *          $ref: '#/definitions/signup'
 *     responses:
 *       201:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/signup'
 */
api.post('/github/callback', social.loginGithubCallback);

export default api;
