import { IUserRepository } from '@application/ports/user-repository.port'
import { UserResponseDTO } from '../dtos/user-response.dto'
import { Email } from '@domain/shared/value-objects/email'

export class GetUserByEmailUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<UserResponseDTO | null> {
    const emailVO = Email.create(email)
    const user = await this.userRepository.findByEmail(emailVO)

    if (!user) {
      return null
    }

    return user.toJSON()
  }
}
