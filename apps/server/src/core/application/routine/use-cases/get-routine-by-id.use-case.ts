import { IRoutineRepository } from '@application/ports/routine-repository.port'
import { RoutineResponseDTO } from '../dtos/routine-response.dto'

export class GetRoutineByIdUseCase {
  constructor(private readonly routineRepository: IRoutineRepository) {}

  async execute(id: number): Promise<RoutineResponseDTO | null> {
    const routine = await this.routineRepository.findById(id)
    if (!routine) {
      return null
    }
    return routine.toJSON()
  }
}
