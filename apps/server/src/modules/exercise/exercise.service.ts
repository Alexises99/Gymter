import { prisma } from 'database'

async function getExerciseById(id: string) {
  return await prisma.exercise.findUnique(id)
}

async function getAllExercisesByCategory(category: string) {
  return await prisma.exercise.findMany({
    where: {
      category: {
        equals: category
      }
    }
  })
}

export const exerciseService = {
  getExerciseById,
  getAllExercisesByCategory
}
