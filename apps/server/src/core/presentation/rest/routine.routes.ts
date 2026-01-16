import { IRoutineRepository } from '@application/ports/routine-repository.port'
import { createRoutineSchema } from '@presentation/schemas/routine.schema'
import { getRoutineUseCases } from '@presentation/use-cases/routine'

import { type FastifyInstance } from 'fastify'
import { z } from 'zod'

interface GetRoutineByIdParams {
  id: string
}

interface GetRoutinesByUserParams {
  userId: string
}

export const createRoutineRestRoutes = (
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

  return async (fastify: FastifyInstance) => {
    fastify.get<{ Params: GetRoutineByIdParams }>(
      '/routines/:id',
      {
        schema: {
          params: z.object({
            id: z.string()
          })
        }
      },
      async (request, reply) => {
        try {
          const routine = await getRoutineByIdUseCase.execute(
            Number(request.params.id)
          )
          reply.code(200).send(routine)
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Error getting routine'
          reply.code(404).send({ error: message })
        }
      }
    )

    fastify.get<{ Params: GetRoutineByIdParams }>(
      '/routines/:id/exercises',
      {
        schema: {
          params: z.object({
            id: z.string()
          })
        }
      },
      async (request, reply) => {
        try {
          const routine = await getRoutineWithExercisesUseCase.execute(
            Number(request.params.id)
          )
          reply.code(200).send(routine)
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'Error getting routine with exercises'
          reply.code(404).send({ error: message })
        }
      }
    )

    fastify.get<{ Params: GetRoutinesByUserParams }>(
      '/routines/user/:userId',
      {
        schema: {
          params: z.object({
            userId: z.string()
          })
        }
      },
      async (request, reply) => {
        try {
          const routine = await getRoutinesByUserUseCase.execute(
            Number(request.params.userId)
          )
          reply.code(200).send(routine)
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'Error getting routines by user'
          reply.code(404).send({ error: message })
        }
      }
    )

    fastify.post<{ Body: z.infer<typeof createRoutineSchema> }>(
      '/routines',
      {
        schema: {
          body: createRoutineSchema
        }
      },
      async (request, reply) => {
        try {
          const routine = await createRoutineUseCase.execute(request.body)
          reply.code(201).send(routine)
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Error creating routine'
          reply.code(400).send({ error: message })
        }
      }
    )

    fastify.put<{ Params: GetRoutineByIdParams }>(
      '/routines/:id',
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
          const routine = await getRoutineByIdUseCase.execute(Number(id))

          if (!routine) {
            return reply.code(404).send({
              error: `Routine with id ${id} not found`
            })
          }

          const { category, id: routineId, name } = routine

          const updatedRoutine = await updateRoutineUseCase.execute({
            id: routineId,
            category,
            name: name
          })
          reply.code(201).send(updatedRoutine)
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Error updating routine'
          reply.code(500).send({ error: message })
        }
      }
    )

    fastify.put<{
      Params: GetRoutineByIdParams
      Body: { exerciseIds: number[] }
    }>(
      '/routines/:id/exercises',
      {
        schema: {
          params: z.object({
            id: z.string()
          }),
          body: z.object({
            exerciseIds: z.array(z.number())
          })
        }
      },
      async (request, reply) => {
        try {
          const { id } = request.params
          const routine = await getRoutineByIdUseCase.execute(Number(id))

          if (!routine) {
            return reply.code(404).send({
              error: `Routine with id ${id} not found`
            })
          }

          const { id: routineId } = routine

          const updatedRoutine = await addExercisesToRoutineUseCase.execute({
            routineId,
            exerciseIds: request.body.exerciseIds
          })
          reply.code(201).send(updatedRoutine)
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Error updating routine'
          reply.code(500).send({ error: message })
        }
      }
    )

    fastify.delete<{
      Params: GetRoutineByIdParams
    }>(
      '/routines/:id',
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

          await deleteRoutineUseCase.execute(Number(id))
          reply.code(200).send({ success: true })
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Error deleting routine'
          reply.code(500).send({ error: message })
        }
      }
    )

    fastify.delete<{
      Params: GetRoutineByIdParams
      Body: { exerciseIds: number[] }
    }>(
      '/routines/:id/exercises',
      {
        schema: {
          params: z.object({
            id: z.string()
          }),
          body: z.object({
            exerciseIds: z.array(z.number())
          })
        }
      },
      async (request, reply) => {
        try {
          const { id } = request.params
          const { exerciseIds } = request.body

          await removeExercisesFromRoutineUseCase.execute({
            routineId: Number(id),
            exerciseIds
          })
          reply.code(200).send({ success: true })
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'Error deleting exercises from routine'
          reply.code(500).send({ error: message })
        }
      }
    )
  }
}
