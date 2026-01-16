import { IRoutineRepository } from '@application/ports/routine-repository.port'
import { UpdateRoutineDTO } from '../dtos/update-routine.dto'
import { RoutineResponseDTO } from '../dtos/routine-response.dto'
import { Category } from '@domain/shared/value-objects/category'

export class UpdateRoutineUseCase {
  constructor(private readonly routineRepository: IRoutineRepository) {}

  async execute(dto: UpdateRoutineDTO): Promise<RoutineResponseDTO> {
    const routine = await this.routineRepository.findById(dto.id)
    if (!routine) {
      throw new Error('Routine not found')
    }

    if (dto.name !== undefined) {
      routine.updateName(dto.name)
    }

    if (dto.category !== undefined) {
      const category = Category.create(dto.category)
      routine.updateCategory(category)
    }

    if (dto.description !== undefined) {
      routine.updateDescription(dto.description)
    }

    const updatedRoutine = await this.routineRepository.update(routine)
    return updatedRoutine.toJSON()
  }
}
