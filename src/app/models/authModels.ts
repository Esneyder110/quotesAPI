import { z } from 'zod'

export const Credentials = z.object({
  email: z.string().email(),
  pass: z.string().min(10)
})
