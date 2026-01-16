import { IRoutineRepository } from '@application/ports/routine-repository.port'
import { AddExercisesToRoutineDTO } from '../dtos/add-exercises-to-routine.dto'

export class AddExercisesToRoutineUseCase {
  constructor(private readonly routineRepository: IRoutineRepository) {}

  async execute(dto: AddExercisesToRoutineDTO): Promise<void> {
    const routine = await this.routineRepository.findById(dto.routineId)
    if (!routine) {
      throw new Error('Routine not found')
    }

    await this.routineRepository.addExercisesToRoutine(
      dto.routineId,
      dto.exerciseIds
    )
  }
}
