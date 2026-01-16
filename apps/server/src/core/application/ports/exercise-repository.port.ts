import { Exercise } from '@domain/exercise/exercise.entity'

export interface IExerciseRepository {
  findById(id: number): Promise<Exercise | null>
  create(exercise: Exercise): Promise<Exercise>
  update(exercise: Exercise): Promise<Exercise>
  delete(id: number): Promise<void>
}
