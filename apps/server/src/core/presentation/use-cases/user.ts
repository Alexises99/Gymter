import { IUserRepository } from '@application/ports/user-repository.port'
import { CreateUserUseCase } from '@application/user/use-cases/create-user.use-case'
import { GetUserByEmailUseCase } from '@application/user/use-cases/get-user-by-email.use-case'
import { GetUserByIdUseCase } from '@application/user/use-cases/get-user-by-id.use-case'

export const getUserUseCases = (userRepository: IUserRepository) => {
  const createUserUseCase = new CreateUserUseCase(userRepository)
  const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepository)
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepository)

  return {
    createUserUseCase,
    getUserByEmailUseCase,
    getUserByIdUseCase
  }
}
