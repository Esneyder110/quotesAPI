/**
 * @openapi
 * components:
 *   schemas:
 *
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         email:
 *           type: string
 *           example: "homer@simpson.com"
 */

export interface User {
  id: string
  email: string
  password: string
}

export type SecureUser = Pick<User, 'id' | 'email'>
