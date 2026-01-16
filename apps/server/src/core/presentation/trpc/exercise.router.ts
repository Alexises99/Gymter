import { IExerciseRepository } from '@application/ports/exercise-repository.port'
import {
  createExerciseSchema,
  updateExerciseSchema
} from '@presentation/schemas/exercise.schema'
import { getExerciseUseCases } from '@presentation/use-cases/exercise'
import { publicProcedure, router } from 'src/trpc/trpc'
import { z } from 'zod'

export const createExerciseTrpcRouter = (
  exerciseRepository: IExerciseRepository
) => {
  const {
    createExerciseUseCase,
    getExerciseByIdUseCase,
    removeExerciseUseCase,
    updateExerciseUseCase
  } = getExerciseUseCases(exerciseRepository)

  return router({
    create: publicProcedure
      .input(createExerciseSchema)
      .mutation(async ({ input }) => {
        return await createExerciseUseCase.execute(input)
      }),

    update: publicProcedure
      .input(updateExerciseSchema)
      .mutation(async ({ input }) => {
        return await updateExerciseUseCase.execute(input)
      }),

    delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
      await removeExerciseUseCase.execute(input)
      return { success: true }
    }),

    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      const exercise = await getExerciseByIdUseCase.execute(input)
      if (!exercise) {
        throw new Error('Exercise not found')
      }
      return exercise
    })
  })
}
