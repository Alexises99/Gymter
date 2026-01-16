import { z } from 'zod'
import { categorySchema } from './shared/category.schema'

const nameSchema = z.string().min(1)

export const createExerciseSchema = z.object({
  name: nameSchema,
  category: categorySchema
})

export const updateExerciseSchema = z.object({
  id: z.number(),
  name: nameSchema.optional(),
  category: categorySchema.optional()
})
