import { prisma, type Prisma } from 'database'
import type { CreateSetInput } from './set.schema'

export async function addSetToExercise(
  exerciseId: number,
  userId: number,
  set: CreateSetInput
) {
  return await prisma.set.create({
    data: {
      ...set,
      exerciseId,
      userId
    }
  })
}

export async function removeSet(setId: number) {
  return await prisma.set.delete({
    where: {
      id: setId
    }
  })
}

export async function updateSet(setId: number, newSet: Prisma.SetUpdateInput) {
  return await prisma.set.update({
    where: {
      id: setId
    },
    data: newSet
  })
}
export async function getSetsByExerciseAndDay(
  exerciseId: number,
  userId: number,
  date: Date
) {
  const startDate = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      0,
      0,
      0,
      0
    )
  )
  const endDate = new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      23,
      59,
      59,
      999
    )
  )
  return await prisma.set.findMany({
    where: {
      exerciseId,
      performedAt: {
        gte: startDate,
        lte: endDate
      },
      userId
    },
    include: {
      exercise: true
    }
  })
}
