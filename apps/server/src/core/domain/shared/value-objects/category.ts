import { z } from 'zod'

export class Category {
  private constructor(private readonly value: string) {}

  static create(category: string): Category {
    if (!this.isValid(category)) {
      throw new Error('Invalid category format')
    }
    return new Category(category.toLowerCase())
  }

  static isValid(category: string): boolean {
    z.string().min(1).parse(category)
    return z.string().min(4).regex(/^\S+$/).safeParse(category).success
  }

  getValue(): string {
    return this.value
  }

  equals(other: Category): boolean {
    return this.value === other.value
  }
}
