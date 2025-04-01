import type { Prisma } from 'database'
import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().max(100),
  email: z.string().email(),
  password: z.string().max(100),
  height: z.number().positive(),
  weight: z.number().positive()
}) satisfies z.Schema<Prisma.UserUncheckedCreateInput>

export type CreateUserInput = z.infer<typeof createUserSchema>
