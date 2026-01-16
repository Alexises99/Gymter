import { IExerciseRepository } from '@application/ports/exercise-repository.port'

export class RemoveExerciseUseCase {
  constructor(private readonly exerciseRepository: IExerciseRepository) {}

  async execute(id: number): Promise<void> {
    const exercise = this.exerciseRepository.findById(id)
    if (!exercise) {
      throw new Error('Exercise not found')
    }
    await this.exerciseRepository.delete(id)
  }
}
