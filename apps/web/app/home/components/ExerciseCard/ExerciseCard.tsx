import { ExerciseCardInfo } from './ExerciseCardInfo'

interface ExerciseCardProps {
  name: string
  category: string
  sets: number
  reps: number
  weight: number
}

export function ExerciseCard({
  category,
  name,
  reps,
  sets,
  weight
}: ExerciseCardProps) {
  return (
    <article className="bg-surface px-5 py-4 rounded-xl flex flex-col gap-5 border border-white/4 shadow-[0_0_12px_rgba(255,255,255,0.03)]">
      <header className="flex items-center">
        <h3 className="flex-1 h5">{name}</h3>
        <span className="px-2 py-1 bg-primary-400 rounded-lg text-foreground text-[12px] font-light">
          {category}
        </span>
      </header>
      <footer className="flex justify-between items-center">
        <ExerciseCardInfo item={sets} name="Sets" />
        <ExerciseCardInfo item={reps} name="Reps" />
        <ExerciseCardInfo item={weight} name="KG" />
      </footer>
    </article>
  )
}
