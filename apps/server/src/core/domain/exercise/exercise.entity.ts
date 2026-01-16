import { Entity } from '@domain/shared/entity'
import { Category } from '@domain/shared/value-objects/category'

export interface ExerciseProps {
  id: number
  name: string
  category: Category
}

export class Exercise extends Entity<number> {
  private _name: string
  private _category: Category
  private _description?: string | null

  private constructor(props: ExerciseProps) {
    super(props.id)
    this._name = props.name
    this._category = props.category
  }

  static create(props: ExerciseProps): Exercise {
    return new Exercise(props)
  }

  static reconstitute(props: ExerciseProps): Exercise {
    return new Exercise(props)
  }

  get name(): string {
    return this._name
  }

  get category(): Category {
    return this._category
  }

  updateName(name: string): void {
    this._name = name
  }

  updateCategory(category: Category): void {
    this._category = category
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      category: this._category.getValue()
    }
  }
}
