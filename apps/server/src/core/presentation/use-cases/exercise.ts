import { CreateExerciseUseCase } from '@application/exercise/use-cases/create-exercise.use-case'
import { RemoveExerciseUseCase } from '@application/exercise/use-cases/delete-exercise.use-case'
import { GetExerciseByIdUseCase } from '@application/exercise/use-cases/get-exercise-by-id.use-case'
import { UpdateExerciseUseCase } from '@application/exercise/use-cases/update-exercise.use-case'
import { IExerciseRepository } from '@application/ports/exercise-repository.port'

export const getExerciseUseCases = (
  exerciseRepository: IExerciseRepository
) => {
  const createExerciseUseCase = new CreateExerciseUseCase(exerciseRepository)
  const removeExerciseUseCase = new RemoveExerciseUseCase(exerciseRepository)
  const updateExerciseUseCase = new UpdateExerciseUseCase(exerciseRepository)
  const getExerciseByIdUseCase = new GetExerciseByIdUseCase(exerciseRepository)

  return {
    createExerciseUseCase,
    removeExerciseUseCase,
    updateExerciseUseCase,
    getExerciseByIdUseCase
  }
}
