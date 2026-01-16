import { IRoutineRepository } from '@application/ports/routine-repository.port'
import { AddExercisesToRoutineUseCase } from '@application/routine/use-cases/add-exercises-to-routine.use-case'
import { CreateRoutineUseCase } from '@application/routine/use-cases/create-routine.use-case'
import { DeleteRoutineUseCase } from '@application/routine/use-cases/delete-routine.use-case'
import { GetRoutineByIdUseCase } from '@application/routine/use-cases/get-routine-by-id.use-case'
import { GetRoutineWithExercisesUseCase } from '@application/routine/use-cases/get-routine-with-exercises.use-case'
import { GetRoutinesByUserUseCase } from '@application/routine/use-cases/get-routines-by-user.use-case'
import { RemoveExercisesFromRoutineUseCase } from '@application/routine/use-cases/remove-exercises-from-routine.use-case'
import { UpdateRoutineUseCase } from '@application/routine/use-cases/update-routine.use-case'

export const getRoutineUseCases = (routineRepository: IRoutineRepository) => {
  const createRoutineUseCase = new CreateRoutineUseCase(routineRepository)
  const getRoutineByIdUseCase = new GetRoutineByIdUseCase(routineRepository)
  const getRoutinesByUserUseCase = new GetRoutinesByUserUseCase(
    routineRepository
  )
  const updateRoutineUseCase = new UpdateRoutineUseCase(routineRepository)
  const deleteRoutineUseCase = new DeleteRoutineUseCase(routineRepository)
  const getRoutineWithExercisesUseCase = new GetRoutineWithExercisesUseCase(
    routineRepository
  )
  const addExercisesToRoutineUseCase = new AddExercisesToRoutineUseCase(
    routineRepository
  )
  const removeExercisesFromRoutineUseCase =
    new RemoveExercisesFromRoutineUseCase(routineRepository)

  return {
    createRoutineUseCase,
    getRoutineByIdUseCase,
    getRoutinesByUserUseCase,
    updateRoutineUseCase,
    deleteRoutineUseCase,
    getRoutineWithExercisesUseCase,
    addExercisesToRoutineUseCase,
    removeExercisesFromRoutineUseCase
  }
}
