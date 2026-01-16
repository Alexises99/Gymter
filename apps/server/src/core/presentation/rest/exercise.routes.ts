import { IExerciseRepository } from '@application/ports/exercise-repository.port'
import { createExerciseSchema } from '@presentation/schemas/exercise.schema'
import { getExerciseUseCases } from '@presentation/use-cases/exercise'

import { type FastifyInstance } from 'fastify'
import { z } from 'zod'

interface GetExerciseByIdParams {
  id: string
}

export const createExerciseRestRoutes = (
  exerciseRepository: IExerciseRepository
) => {
  const {
    createExerciseUseCase,
    getExerciseByIdUseCase,
    removeExerciseUseCase,
    updateExerciseUseCase
  } = getExerciseUseCases(exerciseRepository)

  return async (fastify: FastifyInstance) => {
    fastify.post<{ Body: z.infer<typeof createExerciseSchema> }>(
      '/exercises',
      {
        schema: {
          body: createExerciseSchema
        }
      },
      async (request, reply) => {
        try {
          const exercise = await createExerciseUseCase.execute(request.body)
          reply.code(201).send(exercise)
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Error creating exercise'
          reply.code(400).send({ error: message })
        }
      }
    )

    fastify.put<{ Params: GetExerciseByIdParams }>(
      '/exercises/:id',
      {
        schema: {
          params: z.object({
            id: z.string()
          })
        }
      },
      async (request, reply) => {
        try {
          const { id } = request.params
          const exercise = await getExerciseByIdUseCase.execute(Number(id))

          if (!exercise) {
            return reply.code(404).send({
              error: `Exercise with id ${id} not found`
            })
          }

          const { category, id: exerciseId, name } = exercise

          const updatedExercise = await updateExerciseUseCase.execute({
            id: exerciseId,
            category,
            name
          })
          reply.code(201).send(updatedExercise)
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Error updating exercise'
          reply.code(500).send({ error: message })
        }
      }
    )

    fastify.delete<{ Params: GetExerciseByIdParams }>(
      '/exercises/:id',
      {
        schema: {
          params: z.object({
            id: z.string()
          })
        }
      },
      async (request, reply) => {
        try {
          const { id } = request.params
          await removeExerciseUseCase.execute(Number(id))
          reply.code(200).send({ success: true })
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Error deleting exercise'
          reply.code(500).send({ error: message })
        }
      }
    )
  }
}
