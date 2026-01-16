import { IUserRepository } from '@application/ports/user-repository.port'
import { UserResponseDTO } from '../dtos/user-response.dto'

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<UserResponseDTO | null> {
    const user = await this.userRepository.findById(id)

    if (!user) {
      return null
    }

    return user.toJSON()
  }
}
