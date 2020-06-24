import express from 'express';
import postsController from '../controllers';

const { Router } = express;
const { posts } = postsController;

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
 *     parameters:
 *      - in: query
 *        name: offset
 *        type: integer
 *        description: The number of items to skip before starting to collect the result set.
 *      - in: query
 *        name: limit
 *        type: integer
 *        description: The numbers of items to return.
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.get('/', posts.postsList);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     tags: ["Posts"]
 *     description: Returns post by id
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/post'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/post'
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of post to show
 *        required: true
 *        schema:
 *          type : integer
 *          format: int64
 *          minimum: 1
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.get('/:id', posts.postsDetail);

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags: ["Posts"]
 *     description: Create new post
 *     produces:
 *      - application/json
 *     consumes:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/posts'
 *     parameters:
 *      - name: post
 *        in: body
 *        description: Body for updating post
 *        required: true
 *        schema:
 *          $ref: '#/definitions/postCreate'
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.post('/', posts.postsCreate);

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     tags: ["Posts"]
 *     description: Updates post by id
 *     produces:
 *      - application/json
 *     consumes:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/post'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/post'
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of post to update
 *        required: true
 *        schema:
 *          type : integer
 *          format: int64
 *          minimum: 1
 *      - name: post
 *        in: body
 *        description: Body for updating post
 *        required: true
 *        schema:
 *          $ref: '#/definitions/postCreate'
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.patch('/:id', posts.postsUpdate);


export default api;
