import { Entity } from '@domain/shared/entity'
import { Email } from '@domain/shared/value-objects/email'

export interface UserProps {
  id: string
  name: string
  email: Email
  emailVerified: boolean
  image?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export class User extends Entity<string> {
  private _name: string
  private _email: Email
  private _emailVerified: boolean
  private _image?: string | null

  private constructor(props: UserProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._name = props.name
    this._email = props.email
    this._emailVerified = props.emailVerified
    this._image = props.image
  }

  static create(props: UserProps): User {
    return new User(props)
  }

  static reconstitute(props: UserProps): User {
    return new User(props)
  }

  get name(): string {
    return this._name
  }

  get email(): Email {
    return this._email
  }

  get emailVerified(): boolean {
    return this._emailVerified
  }

  get image(): string | null | undefined {
    return this._image
  }

  updateName(name: string): void {
    this._name = name
  }

  verifyEmail(): void {
    this._emailVerified = true
  }

  updateImage(image: string): void {
    this._image = image
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email.getValue(),
      emailVerified: this._emailVerified,
      image: this._image,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt
    }
  }
}
