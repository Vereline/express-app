import express from 'express';
import postsController from '../controllers';
import middlewares from '../middlewares';

const { Router } = express;
const { posts } = postsController;
const { upload, checkAuth } = middlewares;

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
api.get('/', checkAuth.checkAuth, posts.postsList);

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
 *           $ref: '#/definitions/notFound'
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
api.get('/:id', checkAuth.checkAuth, posts.postsDetail);

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
api.post('/', checkAuth.checkAuth, posts.postsCreate);

/**
 * @swagger
 * /api/posts/postwithimage:
 *   post:
 *     tags: ["Posts"]
 *     description: Create new post with image
 *     consumes:
 *      - multipart/form-data
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           $ref: '#/definitions/posts'
 *     parameters:
 *      - in: formData
 *        name: image
 *        type: file
 *        description: The file to upload.
 *      - in: formData
 *        name: title
 *        type: string
 *        required: false
 *        description: Post title.
 *      - in: formData
 *        name: postText
 *        type: string
 *        required: false
 *        description: Post text.
 *      - in: formData
 *        name: author
 *        type: string
 *        required: false
 *        description: Id of author.
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
// No actual need in this, this was made firstly for swagger needs
api.post('/postwithimage', checkAuth.checkAuth, upload.single('image'), posts.postsCreate);

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
 *           $ref: '#/definitions/notFound'
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
api.patch('/:id', checkAuth.checkAuth, posts.postsUpdate);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     tags: ["Posts"]
 *     description: Deletes post by id
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
 *           $ref: '#/definitions/notFound'
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ID of post to delete
 *        required: true
 *        schema:
 *          type : integer
 *          format: int64
 *          minimum: 1
 *     security:
 *      - JWT: [read, write, admin]
 *      - bearerAuth: [read, write, admin]
 */
api.delete('/:id', checkAuth.checkAuth, posts.postsDelete);

export default api;
