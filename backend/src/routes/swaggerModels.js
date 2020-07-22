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
 *       email:
 *         type: string
 *       password:
 *         type: string
 *   signup:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       birthDate:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       isAdmin:
 *         type: boolean
 *   posts:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Get post detail
 *         postText:
 *           type: string
 *         author:
 *           type: integer
 *   post:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         description: Get post detail
 *       postText:
 *         type: string
 *       author:
 *         type: integer
 *   postCreate:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *         description: Get post detail
 *       postText:
 *         type: string
 *       author:
 *         type: integer
 *   comments:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           description: Get comment detail
 *         post:
 *           type: integer
 *         author:
 *           type: integer
 *   comment:
 *     type: object
 *     properties:
 *       text:
 *         type: string
 *         description: Get comment detail
 *       post:
 *         type: integer
 *       author:
 *         type: integer
 *   commentCreate:
 *     type: object
 *     properties:
 *       text:
 *         type: string
 *       post:
 *         type: integer
 *       author:
 *         type: integer
 *   users:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         birthDate:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *   user:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       birthDate:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       isAdmin:
 *         type: boolean
 *   userCreate:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       birthDate:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       isAdmin:
 *         type: boolean
 */
