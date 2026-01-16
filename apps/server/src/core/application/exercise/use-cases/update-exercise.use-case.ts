import { Category } from '@domain/shared/value-objects/category'
import { UpdateExerciseDTO } from '../dtos/update-exercise.dto'
import { ExerciseResponseDTO } from '../dtos/exercise-response.dto'
import { IExerciseRepository } from '@application/ports/exercise-repository.port'

export class UpdateExerciseUseCase {
  constructor(private readonly exerciseRepository: IExerciseRepository) {}

  async execute(dto: UpdateExerciseDTO): Promise<ExerciseResponseDTO> {
    const exercise = await this.exerciseRepository.findById(dto.id)
    if (!exercise) {
      throw new Error('exercise not found')
    }

    if (dto.name !== undefined) {
      exercise.updateName(dto.name)
    }

    if (dto.category !== undefined) {
      const category = Category.create(dto.category)
      exercise.updateCategory(category)
    }

    const updatedExercise = await this.exerciseRepository.update(exercise)
    return updatedExercise.toJSON()
  }
}
