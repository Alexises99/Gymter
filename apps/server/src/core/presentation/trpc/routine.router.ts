import { IRoutineRepository } from '@application/ports/routine-repository.port'
import { publicProcedure, router } from 'src/trpc/trpc'
import { z } from 'zod'
import {
  addExercisesSchema,
  createRoutineSchema,
  removeExercisesSchema,
  updateRoutineSchema
} from '@presentation/schemas/routine.schema'
import { getRoutineUseCases } from '@presentation/use-cases/routine'

export const createRoutineTrpcRouter = (
  routineRepository: IRoutineRepository
) => {
  const {
    addExercisesToRoutineUseCase,
    createRoutineUseCase,
    deleteRoutineUseCase,
    getRoutineByIdUseCase,
    getRoutineWithExercisesUseCase,
    getRoutinesByUserUseCase,
    removeExercisesFromRoutineUseCase,
    updateRoutineUseCase
  } = getRoutineUseCases(routineRepository)

  return router({
    create: publicProcedure
      .input(createRoutineSchema)
      .mutation(async ({ input }) => {
        return await createRoutineUseCase.execute(input)
      }),

    update: publicProcedure
      .input(updateRoutineSchema)
      .mutation(async ({ input }) => {
        return await updateRoutineUseCase.execute(input)
      }),

    delete: publicProcedure.input(z.number()).mutation(async ({ input }) => {
      await deleteRoutineUseCase.execute(input)
      return { success: true }
    }),

    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      const routine = await getRoutineByIdUseCase.execute(input)
      if (!routine) {
        throw new Error('Routine not found')
      }
      return routine
    }),

    getByUserId: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await getRoutinesByUserUseCase.execute(input)
    }),

    getWithExercises: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        const routine = await getRoutineWithExercisesUseCase.execute(input)
        if (!routine) {
          throw new Error('Routine not found')
        }
        return routine
      }),

    addExercises: publicProcedure
      .input(addExercisesSchema)
      .mutation(async ({ input }) => {
        await addExercisesToRoutineUseCase.execute(input)
        return { success: true }
      }),

    removeExercises: publicProcedure
      .input(removeExercisesSchema)
      .mutation(async ({ input }) => {
        await removeExercisesFromRoutineUseCase.execute(input)
        return { success: true }
      })
  })
}
