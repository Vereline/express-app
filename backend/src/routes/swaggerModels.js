/**
 * @swagger
 * definitions:
 *   demo:
 *     type: object
 *     properties:
 *       hello:
 *         type: string
 *         description: Hello world message
 *   notFound:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Not Found Error
 *       code:
 *         type: integer
 *         description: Not Found Code
 *   login:
 *     type: object
 *     properties:
 *       hello:
 *         type: string
 *         description: Perform login
 *   signup:
 *     type: object
 *     properties:
 *       hello:
 *         type: string
 *         description: Perform signup
 *   posts:
 *     type: object
 *     properties:
 *       hello:
 *         type: string
 *         description: Get list of posts
 *   post:
 *     type: object
 *     properties:
 *       hello:
 *         type: string
 *         description: Get post detail
 *   postCreate:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         description: Get post detail
 *       postText:
 *         type: string
 *       authorId:
 *         type: integer
 *   comments:
 *     type: object
 *     properties:
 *       hello:
 *         type: string
 *         description: Get list of comments
 *   comment:
 *     type: object
 *     properties:
 *       hello:
 *         type: string
 *         description: Get comment detail
 *   commentCreate:
 *     type: object
 *     properties:
 *       text:
 *         type: string
 *       post:
 *         type: integer
 *       author:
 *         type: integer
 */
