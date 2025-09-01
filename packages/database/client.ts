/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient().$extends({
  query: {
    user: {
      async findMany({ args, query }) {
        const users = await query(args)
        return users.map(({ password, ...rest }) => rest)
      },
      async findUnique({ args, query }) {
        const user = await query(args)
        if (!user) return null
        const { password, ...rest } = user
        return rest
      },
      async findFirst({ args, query }) {
        const user = await query(args)
        if (!user) return null
        const { password, ...rest } = user
        return rest
      }
    }
  }
})

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export { prisma }
