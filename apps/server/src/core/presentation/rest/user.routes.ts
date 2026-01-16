import { IUserRepository } from '@application/ports/user-repository.port'
import { CreateUserUseCase } from '@application/user/use-cases/create-user.use-case'
import { GetUserByEmailUseCase } from '@application/user/use-cases/get-user-by-email.use-case'
import { GetUserByIdUseCase } from '@application/user/use-cases/get-user-by-id.use-case'
import { createUserSchema } from '@presentation/schemas/user.schema'
import { getUserUseCases } from '@presentation/use-cases/user'
import { type FastifyInstance } from 'fastify'
import { z } from 'zod'

interface GetUserByEmailParams {
  email: string
}

interface GetUserByIdParams {
  id: string
}

export const createUserRestRoutes = (userRepository: IUserRepository) => {
  const { createUserUseCase, getUserByEmailUseCase, getUserByIdUseCase } =
    getUserUseCases(userRepository)

  return async (fastify: FastifyInstance) => {
    fastify.post<{ Body: z.infer<typeof createUserSchema> }>(
      '/users',
      {
        schema: {
          body: createUserSchema
        }
      },
      async (request, reply) => {
        try {
          const user = await createUserUseCase.execute(request.body)
          reply.code(201).send(user)
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Error creating user'
          reply.code(400).send({ error: message })
        }
      }
    )

    fastify.get<{ Params: GetUserByEmailParams }>(
      '/users/email/:email',
      {
        schema: {
          params: z.object({
            email: z.string().email()
          })
        }
      },
      async (request, reply) => {
        try {
          const { email } = request.params
          const user = await getUserByEmailUseCase.execute(email)

          if (!user) {
            return reply.code(404).send({
              error: `User with email ${email} not found`
            })
          }

          reply.code(200).send(user)
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Error getting user'
          reply.code(500).send({ error: message })
        }
      }
    )

    fastify.get<{ Params: GetUserByIdParams }>(
      '/users/:id',
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
          const user = await getUserByIdUseCase.execute(id)

          if (!user) {
            return reply.code(404).send({
              error: `User with id ${id} not found`
            })
          }

          reply.code(200).send(user)
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Error getting user'
          reply.code(500).send({ error: message })
        }
      }
    )
  }
}
