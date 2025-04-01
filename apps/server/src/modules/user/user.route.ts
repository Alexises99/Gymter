import { type FastifyInstance } from 'fastify'
import { createNewUser, getUserByMail } from './user.service'
import { createUserSchema, type CreateUserInput } from './user.schema'
import { z } from 'zod'

interface GetUserParams {
  mail: string
}

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/users',
    {
      schema: {
        body: createUserSchema
      }
    },
    async (request, reply) => {
      try {
        const user = await createNewUser(request.body as CreateUserInput)
        reply.code(201).send(user)
      } catch {
        reply.code(500).send({ error: 'Error al crear el usuario' })
      }
    }
  )

  fastify.get<{ Params: GetUserParams }>(
    '/users/:mail',
    {
      schema: {
        params: z.object({
          mail: z.string().email()
        })
      }
    },
    async (request, reply) => {
      try {
        const { mail } = request.params
        const user = await getUserByMail(mail)
        if (!user)
          return reply
            .code(404)
            .send({ error: `User with mail ${mail} does not exists` })
        reply.code(200).send(user)
      } catch {
        reply.code(500).send({ error: 'Error getting user' })
      }
    }
  )
}
