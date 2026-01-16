import { router } from '../trpc'
import { createUserTrpcRouter } from '../../core/presentation/trpc/user.router'
import { createRoutineTrpcRouter } from '../../core/presentation/trpc/routine.router'
import { DIContainer } from '../../core/infrastructure/di/container'
import { createExerciseTrpcRouter } from '@presentation/trpc/exercise.router'

const container = DIContainer.getInstance()

export const appRouter = router({
  user: createUserTrpcRouter(container.userRepository),
  routine: createRoutineTrpcRouter(container.routineRepository),
  exercise: createExerciseTrpcRouter(container.exerciseRepository)
})

export type AppRouter = typeof appRouter

export const createCaller = appRouter.createCaller
