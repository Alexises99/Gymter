import { publicProcedure, router } from 'src/trpc/trpc'
import { z } from 'zod'
import { commonSetSchema, createSetSchema } from './set.schema'
import {
  addSetToExercise,
  getSetsByExerciseAndDay,
  removeSet,
  updateSet
} from './set.service'

export const setRouter = router({
  createSet: publicProcedure
    .input(createSetSchema.merge(commonSetSchema))
    .mutation(async ({ input }) => {
      const { exerciseId, userId, ...newSet } = input
      return await addSetToExercise(exerciseId, userId, newSet)
    }),
  getSets: publicProcedure
    .input(commonSetSchema.merge(z.object({ date: z.date() })))
    .query(async ({ input }) => {
      const { date, exerciseId, userId } = input
      return await getSetsByExerciseAndDay(exerciseId, userId, date)
    }),
  removeSet: publicProcedure
    .input(z.number().positive())
    .mutation(async ({ input }) => await removeSet(input)),
  updateSet: publicProcedure
    .input(createSetSchema.merge(z.object({ setId: z.number().positive() })))
    .mutation(async ({ input }) => {
      const { setId, ...set } = input
      return await updateSet(setId, set)
    })
})
