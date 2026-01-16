export interface RoutineExerciseProps {
  routineId: number
  exerciseId: number
}

export class RoutineExercise {
  private readonly _routineId: number
  private readonly _exerciseId: number

  private constructor(props: RoutineExerciseProps) {
    this._routineId = props.routineId
    this._exerciseId = props.exerciseId
  }

  static create(props: RoutineExerciseProps): RoutineExercise {
    return new RoutineExercise(props)
  }

  static reconstitute(props: RoutineExerciseProps): RoutineExercise {
    return new RoutineExercise(props)
  }

  get routineId(): number {
    return this._routineId
  }

  get exerciseId(): number {
    return this._exerciseId
  }

  equals(other: RoutineExercise): boolean {
    return (
      this._routineId === other._routineId &&
      this._exerciseId === other._exerciseId
    )
  }

  toJSON() {
    return {
      routineId: this._routineId,
      exerciseId: this._exerciseId
    }
  }
}
