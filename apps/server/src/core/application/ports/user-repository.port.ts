import { Email } from '@domain/shared/value-objects/email'
import { User } from '@domain/user/user.entity'

export interface IUserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  create(user: User): Promise<User>
  update(user: User): Promise<User>
  delete(id: string): Promise<void>
}
