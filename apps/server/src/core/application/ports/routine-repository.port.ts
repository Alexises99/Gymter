import { Routine } from '@domain/routine/routine.entity'
import { RoutineExercise } from '@domain/routine/routine-exercise.entity'

export interface IRoutineRepository {
  findById(id: number): Promise<Routine | null>
  findByUserId(userId: number): Promise<Routine[]>
  create(routine: Routine): Promise<Routine>
  update(routine: Routine): Promise<Routine>
  delete(id: number): Promise<void>

  // Routine Exercise operations
  addExercisesToRoutine(routineId: number, exerciseIds: number[]): Promise<void>
  removeExercisesFromRoutine(
    routineId: number,
    exerciseIds: number[]
  ): Promise<void>
  findRoutineExercises(routineId: number): Promise<RoutineExercise[]>
  findRoutineWithExercises(routineId: number): Promise<{
    routine: Routine
    exercises: Array<{ id: number; name: string; category: string }>
  } | null>
}
