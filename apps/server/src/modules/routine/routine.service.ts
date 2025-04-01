import { prisma, type Routine, type User } from 'database'

async function getRoutinesCreatedByUser(user: User): Promise<Routine[]> {
  return await prisma.routine.findMany({
    where: {
      userId: user.id
    }
  })
}

async function getRoutinesSubcribedByUser(user: User) {
  return await prisma.routine.findMany({
    where: {
      user: {
        id: user.id
      }
    }
  })
}

export const routineService = {
  getRoutinesCreatedByUser,
  getRoutinesSubcribedByUser
}
