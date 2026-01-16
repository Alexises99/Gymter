import { IUserRepository } from '@application/ports/user-repository.port'
import { UserResponseDTO } from '../dtos/user-response.dto'
import { CreateUserDTO } from '../dtos/create-user.dto'
import { Email } from '@domain/shared/value-objects/email'
import { User } from '@domain/user/user.entity'

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: CreateUserDTO): Promise<UserResponseDTO> {
    const email = Email.create(dto.email)

    const existingUser = await this.userRepository.findByEmail(email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    const user = User.create({
      id: dto.id,
      name: dto.name,
      email,
      emailVerified: dto.emailVerified ?? false,
      image: dto.image
    })

    const createdUser = await this.userRepository.create(user)

    return createdUser.toJSON()
  }
}
