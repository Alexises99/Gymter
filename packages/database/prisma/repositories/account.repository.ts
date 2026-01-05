import { prisma } from '@/client'

function findByIdSafe(id: string) {
  return prisma.account.findUnique({
    where: { id },
    select: {
      id: true,
      providerId: true,
      userId: true
    }
  })
}

export const accountRepository = {
  findByIdSafe
}
