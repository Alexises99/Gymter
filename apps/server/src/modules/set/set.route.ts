import { type FastifyInstance } from 'fastify'
import { z } from 'zod'
import { createSetSchema, type CreateSetInput } from './set.schema'
import {
  addSetToExercise,
  getSetsByExerciseAndDay,
  removeSet,
  updateSet
} from './set.service'

interface SetExerciseIdParams {
  exerciseId: number
}

interface SetSetIdParams {
  setId: number
}

interface QueryGetParams {
  date: Date
}

// TODO CHANGE
const userId = 1

export default async function setRoutes(fastify: FastifyInstance) {
  fastify.post<{ Params: SetExerciseIdParams }>(
    '/exercises/:exerciseId/sets',
    {
      schema: {
        params: {
          exerciseId: z.number().positive()
        },
        body: createSetSchema
      }
    },
    async (request, reply) => {
      try {
        const { exerciseId } = request.params
        const createdSet = await addSetToExercise(
          exerciseId,
          userId,
          request.body as CreateSetInput
        )
        reply.code(201).send(createdSet)
      } catch {
        reply.code(500).send({ error: 'Error creating set' })
      }
    }
  )

  fastify.get<{ Params: SetExerciseIdParams; Querystring: QueryGetParams }>(
    '/sets/:setId',
    {
      schema: {
        params: {
          exerciseId: z.number().positive()
        },
        querystring: {
          date: z.date()
        }
      }
    },
    async (request, reply) => {
      const { exerciseId } = request.params
      try {
        const { exerciseId } = request.params
        const { date } = request.query
        const setsWithExercise = await getSetsByExerciseAndDay(
          exerciseId,
          userId,
          date
        )
        if (!setsWithExercise)
          return reply.code(404).send({
            error: `Exercise ${exerciseId} does not exists or ${date} is invalid`
          })
        reply.code(200).send(setsWithExercise)
      } catch {
        reply
          .code(500)
          .send({ error: `Error getting sets in exercise ${exerciseId}` })
      }
    }
  )

  fastify.delete<{ Params: SetSetIdParams }>(
    '/exercises/:exerciseId/sets/:setId',
    {
      schema: {
        params: {
          setId: z.number().positive()
        }
      }
    },
    async (request, reply) => {
      const { setId } = request.params
      try {
        await removeSet(setId)
        reply.code(204).send()
      } catch {
        reply.code(500).send({ error: `Error deleting set ${setId}` })
      }
    }
  )

  fastify.put<{ Params: SetSetIdParams }>(
    '/exercises/:exerciseId/sets/:setId',
    {
      schema: {
        params: {
          setId: z.number().positive()
        },
        body: createSetSchema
      }
    },
    async (request, reply) => {
      const { setId } = request.params
      try {
        const updatedSet = await updateSet(
          setId,
          request.body as CreateSetInput
        )
        reply.code(200).send(updatedSet)
      } catch {
        reply.code(500).send({ error: `Error updating set ${setId}` })
      }
    }
  )
}
