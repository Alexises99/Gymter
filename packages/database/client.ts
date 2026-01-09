import 'dotenv/config'
import { PrismaClient } from './prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { env } from 'prisma/config'

const adapter = new PrismaPg({
  connectionString: env('DATABASE_URL')
})

const prismaClient = new PrismaClient({ adapter })

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClient

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
