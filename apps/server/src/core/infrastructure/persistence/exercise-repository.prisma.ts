import { Category } from '@domain/shared/value-objects/category'
import { PrismaClient } from 'database'
import { IExerciseRepository } from '@application/ports/exercise-repository.port'
import { Exercise } from '@domain/exercise/exercise.entity'

export class ExerciseRepositoryPrisma implements IExerciseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: number): Promise<Exercise | null> {
    const exercise = await this.prisma.exercise.findUnique({
      where: { id }
    })

    if (!exercise) return null

    return Exercise.reconstitute({
      category: Category.create(exercise.category),
      id: exercise.id,
      name: exercise.name
    })
  }

  async create(exercise: Exercise): Promise<Exercise> {
    const { category, name } = exercise
    const exerciseData = await this.prisma.exercise.create({
      data: {
        name,
        category: category.getValue()
      }
    })

    const { id, category: categoryValue, name: exerciseName } = exerciseData

    return Exercise.reconstitute({
      id,
      name: exerciseName,
      category: Category.create(categoryValue)
    })
  }

  async update(exercise: Exercise): Promise<Exercise> {
    const exerciseData = await this.prisma.exercise.update({
      where: { id: exercise.id },
      data: {
        name: exercise.name,
        category: exercise.category.getValue()
      }
    })

    const { category, id, name } = exerciseData

    return Exercise.reconstitute({
      id,
      name,
      category: Category.create(category)
    })
  }

  async delete(id: number): Promise<void> {
    await this.prisma.exercise.delete({
      where: { id }
    })
  }
}
