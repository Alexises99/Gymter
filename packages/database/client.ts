import { PrismaClient } from './generated/prisma'

const prismaClient = new PrismaClient().$extends({
  query: {
    account: {
      async findUnique({ args, query }) {
        const account = await query(args)
        if (!account) return null
        const { password, ...rest } = account
        return rest
      },
      async findFirst({ args, query }) {
        const account = await query(args)
        if (!account) return null
        const { password, ...rest } = account
        return rest
      },
      async findMany({ args, query }) {
        const accounts = await query(args)
        return accounts.map(({ password, ...rest }) => rest)
      }
    }
  }
})

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClient

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
