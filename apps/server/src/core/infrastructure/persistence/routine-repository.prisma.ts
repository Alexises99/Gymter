import { IRoutineRepository } from '@application/ports/routine-repository.port'
import { Category } from '@domain/shared/value-objects/category'
import { Routine } from '@domain/routine/routine.entity'
import { RoutineExercise } from '@domain/routine/routine-exercise.entity'
import { PrismaClient } from 'database'

export class RoutineRepositoryPrisma implements IRoutineRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: number): Promise<Routine | null> {
    const routineData = await this.prisma.routine.findUnique({
      where: { id }
    })

    if (!routineData) {
      return null
    }

    return Routine.reconstitute({
      id: routineData.id,
      userId: routineData.userId!,
      name: routineData.name,
      category: Category.create(routineData.category),
      description: routineData.description,
      createdAt: routineData.createdAt ?? undefined
    })
  }

  async findByUserId(userId: number): Promise<Routine[]> {
    const routines = await this.prisma.routine.findMany({
      where: { userId }
    })

    return routines.map((routineData) =>
      Routine.reconstitute({
        id: routineData.id,
        userId: routineData.userId!,
        name: routineData.name,
        category: Category.create(routineData.category),
        description: routineData.description,
        createdAt: routineData.createdAt ?? undefined
      })
    )
  }

  async create(routine: Routine): Promise<Routine> {
    const routineData = await this.prisma.routine.create({
      data: {
        userId: routine.userId,
        name: routine.name,
        category: routine.category.getValue(),
        description: routine.description
      }
    })

    return Routine.reconstitute({
      id: routineData.id,
      userId: routineData.userId!,
      name: routineData.name,
      category: Category.create(routineData.category),
      description: routineData.description,
      createdAt: routineData.createdAt ?? undefined
    })
  }

  async update(routine: Routine): Promise<Routine> {
    const routineData = await this.prisma.routine.update({
      where: { id: routine.id },
      data: {
        name: routine.name,
        category: routine.category.getValue(),
        description: routine.description
      }
    })

    return Routine.reconstitute({
      id: routineData.id,
      userId: routineData.userId!,
      name: routineData.name,
      category: Category.create(routineData.category),
      description: routineData.description,
      createdAt: routineData.createdAt ?? undefined
    })
  }

  async delete(id: number): Promise<void> {
    await this.prisma.routine.delete({
      where: { id }
    })
  }

  async addExercisesToRoutine(
    routineId: number,
    exerciseIds: number[]
  ): Promise<void> {
    await this.prisma.routineExercise.createMany({
      data: exerciseIds.map((exerciseId) => ({
        routineId,
        exerciseId
      })),
      skipDuplicates: true
    })
  }

  async removeExercisesFromRoutine(
    routineId: number,
    exerciseIds: number[]
  ): Promise<void> {
    await this.prisma.routineExercise.deleteMany({
      where: {
        routineId,
        exerciseId: {
          in: exerciseIds
        }
      }
    })
  }

  async findRoutineExercises(routineId: number): Promise<RoutineExercise[]> {
    const routineExercises = await this.prisma.routineExercise.findMany({
      where: { routineId }
    })

    return routineExercises.map((re) =>
      RoutineExercise.reconstitute({
        routineId: re.routineId,
        exerciseId: re.exerciseId
      })
    )
  }

  async findRoutineWithExercises(routineId: number): Promise<{
    routine: Routine
    exercises: Array<{ id: number; name: string; category: string }>
  } | null> {
    const routineData = await this.prisma.routine.findUnique({
      where: { id: routineId },
      include: {
        routineExercises: {
          include: {
            exercise: true
          }
        }
      }
    })

    if (!routineData) {
      return null
    }

    const routine = Routine.reconstitute({
      id: routineData.id,
      userId: routineData.userId!,
      name: routineData.name,
      category: Category.create(routineData.category),
      description: routineData.description,
      createdAt: routineData.createdAt ?? undefined
    })

    const exercises = routineData.routineExercises.map((re) => ({
      id: re.exercise.id,
      name: re.exercise.name,
      category: re.exercise.category
    }))

    return { routine, exercises }
  }
}
