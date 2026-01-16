import { IUserRepository } from '@application/ports/user-repository.port'
import { IRoutineRepository } from '@application/ports/routine-repository.port'
import { UserRepositoryPrisma } from '@infrastructure/persistence/user-repository.prisma'
import { RoutineRepositoryPrisma } from '@infrastructure/persistence/routine-repository.prisma'
import { getPrismaClient } from '@infrastructure/prisma/prisma.service'
import { PrismaClient } from 'database'
import { IExerciseRepository } from '@application/ports/exercise-repository.port'
import { ExerciseRepositoryPrisma } from '@infrastructure/persistence/exercise-repository.prisma'

export class DIContainer {
  private static instance: DIContainer
  private _prismaClient: PrismaClient
  private _userRepository: IUserRepository
  private _routineRepository: IRoutineRepository
  private _exerciseRepository: IExerciseRepository

  private constructor() {
    this._prismaClient = getPrismaClient()
    this._userRepository = new UserRepositoryPrisma(this._prismaClient)
    this._routineRepository = new RoutineRepositoryPrisma(this._prismaClient)
    this._exerciseRepository = new ExerciseRepositoryPrisma(this._prismaClient)
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer()
    }
    return DIContainer.instance
  }

  get prismaClient(): PrismaClient {
    return this._prismaClient
  }

  get userRepository(): IUserRepository {
    return this._userRepository
  }

  get routineRepository(): IRoutineRepository {
    return this._routineRepository
  }

  get exerciseRepository(): IExerciseRepository {
    return this._exerciseRepository
  }
}
