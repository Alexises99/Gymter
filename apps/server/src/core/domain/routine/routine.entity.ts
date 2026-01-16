import { Entity } from '@domain/shared/entity'
import { Category } from '@domain/shared/value-objects/category'

export interface RoutineProps {
  id: number
  userId: number
  name: string
  category: Category
  description?: string | null
  createdAt?: Date
}

export class Routine extends Entity<number> {
  private _userId: number
  private _name: string
  private _category: Category
  private _description?: string | null

  private constructor(props: RoutineProps) {
    super(props.id)
    this._userId = props.userId
    this._name = props.name
    this._category = props.category
    this._description = props.description
  }

  static create(props: RoutineProps): Routine {
    return new Routine(props)
  }

  static reconstitute(props: RoutineProps): Routine {
    return new Routine(props)
  }

  get userId(): number {
    return this._userId
  }

  get name(): string {
    return this._name
  }

  get category(): Category {
    return this._category
  }

  get description(): string | null | undefined {
    return this._description
  }

  updateName(name: string): void {
    this._name = name
  }

  updateCategory(category: Category): void {
    this._category = category
  }

  updateDescription(description: string | null): void {
    this._description = description
  }

  toJSON() {
    return {
      id: this._id,
      userId: this._userId,
      name: this._name,
      category: this._category.getValue(),
      description: this._description,
      createdAt: this._createdAt
    }
  }
}
