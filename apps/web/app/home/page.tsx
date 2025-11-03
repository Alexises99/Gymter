import { DayCard } from './components/DayCard'

export default function HomePage() {
  return (
    <>
      <main className="font-poppins">
        <DayCard date={new Date()} />
      </main>
    </>
  )
}
