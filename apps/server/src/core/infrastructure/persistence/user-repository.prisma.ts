import { IUserRepository } from '@application/ports/user-repository.port'
import { Email } from '@domain/shared/value-objects/email'
import { User } from '@domain/user/user.entity'
import { PrismaClient } from 'database'

export class UserRepositoryPrisma implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id }
    })

    if (!userData) {
      return null
    }

    return User.reconstitute({
      id: userData.id,
      name: userData.name,
      email: Email.create(userData.email),
      emailVerified: userData.emailVerified,
      image: userData.image,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    })
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email: email.getValue() }
    })

    if (!userData) {
      return null
    }

    return User.reconstitute({
      id: userData.id,
      name: userData.name,
      email: Email.create(userData.email),
      emailVerified: userData.emailVerified,
      image: userData.image,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    })
  }

  async create(user: User): Promise<User> {
    const userData = await this.prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email.getValue(),
        emailVerified: user.emailVerified,
        image: user.image
      }
    })

    return User.reconstitute({
      id: userData.id,
      name: userData.name,
      email: Email.create(userData.email),
      emailVerified: userData.emailVerified,
      image: userData.image,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    })
  }

  async update(user: User): Promise<User> {
    const userData = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email.getValue(),
        emailVerified: user.emailVerified,
        image: user.image,
        updatedAt: user.updatedAt
      }
    })

    return User.reconstitute({
      id: userData.id,
      name: userData.name,
      email: Email.create(userData.email),
      emailVerified: userData.emailVerified,
      image: userData.image,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    })
  }
}
