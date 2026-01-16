export interface CreateUserDTO {
  id: string
  name: string
  email: string
  emailVerified?: boolean
  image?: string | null
}
