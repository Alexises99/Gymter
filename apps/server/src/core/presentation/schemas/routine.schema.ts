import { z } from 'zod'
import { categorySchema } from './shared/category.schema'

const nameSchema = z.string().min(1)

const descriptionSchema = z.string().nullable()

const exerciseIdsSchema = z.array(z.number()).min(1)

export const createRoutineSchema = z.object({
  userId: z.number(),
  name: nameSchema,
  category: categorySchema,
  description: descriptionSchema.optional(),
  exerciseIds: exerciseIdsSchema.optional()
})

export const updateRoutineSchema = z.object({
  id: z.number(),
  name: nameSchema.optional(),
  category: categorySchema.optional(),
  description: descriptionSchema.optional()
})

export const addExercisesSchema = z.object({
  routineId: z.number(),
  exerciseIds: exerciseIdsSchema
})

export const removeExercisesSchema = z.object({
  routineId: z.number(),
  exerciseIds: exerciseIdsSchema
})
