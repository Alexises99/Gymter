import { IRoutineRepository } from '@application/ports/routine-repository.port'
import { RoutineResponseDTO } from '../dtos/routine-response.dto'

export class GetRoutinesByUserUseCase {
  constructor(private readonly routineRepository: IRoutineRepository) {}

  async execute(userId: number): Promise<RoutineResponseDTO[]> {
    const routines = await this.routineRepository.findByUserId(userId)
    return routines.map((routine) => routine.toJSON())
  }
}
