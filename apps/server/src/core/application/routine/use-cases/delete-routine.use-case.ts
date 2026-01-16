import { IRoutineRepository } from '@application/ports/routine-repository.port'

export class DeleteRoutineUseCase {
  constructor(private readonly routineRepository: IRoutineRepository) {}

  async execute(id: number): Promise<void> {
    const routine = await this.routineRepository.findById(id)
    if (!routine) {
      throw new Error('Routine not found')
    }

    await this.routineRepository.delete(id)
  }
}
