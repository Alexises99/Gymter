import { prisma } from 'database'

export const getPrismaClient = () => {
  return prisma
}

export const disconnectPrisma = async (): Promise<void> => {
  await prisma.$disconnect()
}
