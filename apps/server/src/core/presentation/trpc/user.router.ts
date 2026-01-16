import { IUserRepository } from '@application/ports/user-repository.port'
import { CreateUserUseCase } from '@application/user/use-cases/create-user.use-case'
import { GetUserByEmailUseCase } from '@application/user/use-cases/get-user-by-email.use-case'
import { GetUserByIdUseCase } from '@application/user/use-cases/get-user-by-id.use-case'
import { createUserSchema } from '@presentation/schemas/user.schema'
import { getUserUseCases } from '@presentation/use-cases/user'
import { publicProcedure, router } from 'src/trpc/trpc'
import { z } from 'zod'

export const createUserTrpcRouter = (userRepository: IUserRepository) => {
  const { createUserUseCase, getUserByEmailUseCase, getUserByIdUseCase } =
    getUserUseCases(userRepository)

  return router({
    create: publicProcedure
      .input(createUserSchema)
      .mutation(async ({ input }) => {
        return await createUserUseCase.execute(input)
      }),

    getByEmail: publicProcedure
      .input(z.string().email())
      .query(async ({ input }) => {
        const user = await getUserByEmailUseCase.execute(input)
        if (!user) {
          throw new Error('User not found')
        }
        return user
      }),

    getById: publicProcedure.input(z.string()).query(async ({ input }) => {
      const user = await getUserByIdUseCase.execute(input)
      if (!user) {
        throw new Error('User not found')
      }
      return user
    })
  })
}
