import { IRoutineRepository } from '@application/ports/routine-repository.port'
import { RemoveExercisesFromRoutineDTO } from '../dtos/remove-exercises-from-routine.dto'

export class RemoveExercisesFromRoutineUseCase {
  constructor(private readonly routineRepository: IRoutineRepository) {}

  async execute(dto: RemoveExercisesFromRoutineDTO): Promise<void> {
    const routine = await this.routineRepository.findById(dto.routineId)
    if (!routine) {
      throw new Error('Routine not found')
    }

    await this.routineRepository.removeExercisesFromRoutine(
      dto.routineId,
      dto.exerciseIds
    )
  }
}
