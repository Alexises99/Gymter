import type { Prisma } from 'database'
import { z } from 'zod'

export const createSetSchema = z.object({
  weight: z.number().positive().max(300),
  repetitions: z.number().positive(),
  feeling: z
    .string()
    .regex(/\b(good|bad|neutral)\b/)
    .optional()
}) satisfies z.Schema<Prisma.SetUncheckedCreateInput>

export const commonSetSchema = z.object({
  exerciseId: z.number(),
  userId: z.number()
})

export type CreateSetInput = z.infer<typeof createSetSchema>
export type CommonSetInput = z.infer<typeof commonSetSchema>
