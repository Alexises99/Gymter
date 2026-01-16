export interface CreateRoutineDTO {
  userId: number
  name: string
  category: string
  description?: string | null
  exerciseIds?: number[]
}
