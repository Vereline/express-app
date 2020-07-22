import express from 'express';
import commentsController from '../controllers';
import checkAuthMiddleware from '../middlewares';

const { Router } = express;
const { comments } = commentsController;
const { checkAuth } = checkAuthMiddleware;

const api = Router();

/**
 * @swagger
 * /api/comments:
 *   get:
 *     tags: ["Comments"]
 *     description: Returns list of existing comments
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/comments'
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
api.get('/', checkAuth.checkAuth, comments.commentsList);

/**
 * @swagger
 * /api/comments/{postId}:
 *   get:
 *     tags: ["Comments"]
 *     description: Returns list of existing comments for defined post
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/comments'
 *     parameters:
 *      - name: postId
 *        in: path
 *        description: ID of post for comments
 *        required: true
 *        schema:
 *          type : integer
 *          format: int64
 *          minimum: 1
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
api.get('/:postId', checkAuth.checkAuth, comments.commentsPostList);

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     tags: ["Comments"]
 *     description: Returns comment by id
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/comment'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/notFound'
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of comment to show
 *        required: true
 *        schema:
 *          type : integer
 *          format: int64
 *          minimum: 1
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.get('/:id', checkAuth.checkAuth, comments.commentsDetail);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     tags: ["Comments"]
 *     description: Create new comment
 *     produces:
 *      - application/json
 *     consumes:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/comments'
 *     parameters:
 *      - name: comment
 *        in: body
 *        description: Body for updating comment
 *        required: true
 *        schema:
 *          $ref: '#/definitions/commentCreate'
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.post('/', checkAuth.checkAuth, comments.commentsCreate);

/**
 * @swagger
 * /api/comments/{id}:
 *   patch:
 *     tags: ["Comments"]
 *     description: Updates comment by id
 *     produces:
 *      - application/json
 *     consumes:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/comment'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/notFound'
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of comment to update
 *        required: true
 *        schema:
 *          type : integer
 *          format: int64
 *          minimum: 1
 *      - name: comment
 *        in: body
 *        description: Body for updating comment
 *        required: true
 *        schema:
 *          $ref: '#/definitions/commentCreate'
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.patch('/:id', checkAuth.checkAuth, comments.commentsUpdate);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     tags: ["Comments"]
 *     description: Deletes comment by id
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/comment'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/notFound'
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of comment to delete
 *        required: true
 *        schema:
 *          type : integer
 *          format: int64
 *          minimum: 1
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.delete('/:id', checkAuth.checkAuth, comments.commentsDelete);

export default api;
