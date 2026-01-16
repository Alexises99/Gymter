export interface RoutineResponseDTO {
  id: number
  userId: number
  name: string
  category: string
  description?: string | null
  createdAt: Date
}

export interface RoutineWithExercisesResponseDTO extends RoutineResponseDTO {
  exercises: Array<{
    exerciseId: number
    name?: string
    category?: string
  }>
}
