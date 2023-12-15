export interface User {
  id: string
  email: string
  password: string
}

export type SecureUser = Pick<User, 'id' | 'email'>
