import { DynamicTimeContainer } from './components/DynamicTimeContainer'
import { PeriodSelect } from './components/PeriodSelect'
import { IconGhost } from '@tabler/icons-react'
import { ExerciseCard } from './components/ExerciseCard/ExerciseCard'

export default function HomePage() {
  return (
    <main className="font-poppins text-foreground">
      <article className="flex flex-col gap-6">
        <DynamicTimeContainer />
      </article>
      <section className="px-4">
        <div className="flex gap-2 items-center mt-9 mb-3">
          <h2 className="h4 font-extrabold">Chest Day</h2>
          <IconGhost size={30} />
        </div>

        <span className="text-grey-500">Keep focus and push through!</span>

        <ul className="flex flex-col gap-4 mt-4">
          <ExerciseCard
            name="Bench Press"
            category="Chest"
            sets={4}
            reps={10}
            weight={135}
          />
          <ExerciseCard
            name="Incline Dumbbell Press"
            category="Chest"
            sets={3}
            reps={12}
            weight={50}
          />
          <ExerciseCard
            name="Chest Fly"
            category="Chest"
            sets={3}
            reps={15}
            weight={30}
          />
        </ul>
      </section>
    </main>
  )
}
