import { UserExceedsFavoritesLimit } from '@utils/errors/user'
import { prisma } from 'database'
import type { CreateUserInput } from './user.schema'

export async function createNewUser(user: CreateUserInput) {
  return await prisma.user.create({
    data: {
      ...user
    }
  })
}

export async function getUserByMail(mail: string) {
  return await prisma.user.findUnique({
    where: {
      email: mail
    }
  })
}

export async function getFavoritesRoutinesByUser(userId: number) {
  return await prisma.user.findMany({
    where: {
      id: userId
    },
    include: {
      favoriteRoutine: {
        include: {
          routine: true
        }
      }
    }
  })
}

export async function addFavoriteRoutine(userId: number, routineId: number) {
  const favoriteCount = await prisma.favoriteRoutine.count({
    where: {
      userId
    }
  })

  if (favoriteCount >= 5) {
    throw new UserExceedsFavoritesLimit()
  }

  return await prisma.favoriteRoutine.create({
    data: {
      userId,
      routineId
    }
  })
}
