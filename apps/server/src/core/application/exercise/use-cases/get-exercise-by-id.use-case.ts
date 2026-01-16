import { IExerciseRepository } from '@application/ports/exercise-repository.port'
import { ExerciseResponseDTO } from '../dtos/exercise-response.dto'

export class GetExerciseByIdUseCase {
  constructor(private readonly exerciseRepository: IExerciseRepository) {}

  async execute(id: number): Promise<ExerciseResponseDTO> {
    const exercise = await this.exerciseRepository.findById(id)
    if (!exercise) {
      throw new Error('Exercise not found')
    }
    return exercise.toJSON()
  }
}
