import { publicProcedure, router } from 'src/trpc/trpc'
import { createUserSchema } from './user.schema'
import { createNewUser, getUserByMail } from './user.service'
import { z } from 'zod'

export const userRouter = router({
  createUser: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => await createNewUser(input)),
  getUser: publicProcedure
    .input(z.string())
    .query(async ({ input }) => await getUserByMail(input))
})
