import { IRoutineRepository } from '@application/ports/routine-repository.port'
import { RoutineWithExercisesResponseDTO } from '../dtos/routine-response.dto'

export class GetRoutineWithExercisesUseCase {
  constructor(private readonly routineRepository: IRoutineRepository) {}

  async execute(id: number): Promise<RoutineWithExercisesResponseDTO | null> {
    const result = await this.routineRepository.findRoutineWithExercises(id)
    if (!result) {
      return null
    }

    return {
      ...result.routine.toJSON(),
      exercises: result.exercises.map((exercise) => ({
        exerciseId: exercise.id,
        name: exercise.name,
        category: exercise.category
      }))
    }
  }
}
