import { DynamicTimeContainer } from './components/DynamicTimeContainer'
import { PeriodSelect } from './components/PeriodSelect'

export default function HomePage() {
  return (
    <main className="font-poppins">
      <article className="flex flex-col gap-6">
        <DynamicTimeContainer />
        {/* <PeriodSelect /> */}
      </article>
    </main>
  )
}
