import express from 'express';
import usersController from '../controllers';
import checkAuthMiddleware from '../middlewares';

const { Router } = express;
const { users } = usersController;
const { checkAuth } = checkAuthMiddleware;

const api = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: ["Users"]
 *     description: Returns list of existing users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/users'
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
api.get('/', checkAuth.checkAuth, users.getUserList);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: ["Users"]
 *     description: Returns users by id
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/user'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/notFound'
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to show
 *        required: true
 *        schema:
 *          type : integer
 *          format: int64
 *          minimum: 1
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.get('/:id', checkAuth.checkAuth, users.getUserDetail);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags: ["Users"]
 *     description: Updates user by id
 *     produces:
 *      - application/json
 *     consumes:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/user'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/notFound'
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to update
 *        required: true
 *        schema:
 *          type : integer
 *          format: int64
 *          minimum: 1
 *      - name: user
 *        in: body
 *        description: Body for updating user
 *        required: true
 *        schema:
 *          $ref: '#/definitions/userCreate'
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.patch('/:id', checkAuth.checkAuth, users.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: ["Users"]
 *     description: Deletes user by id
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/user'
 *       404:
 *         description: Error
 *         schema:
 *           $ref: '#/definitions/notFound'
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to delete
 *        required: true
 *        schema:
 *          type : integer
 *          format: int64
 *          minimum: 1
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.delete('/:id', checkAuth.checkAuth, users.deleteUser);

export default api;
