import timeUtils from '@/utils/time'
import { DayCard } from './DayCard'

export const msPerPx = 600000 * 2

interface TimeLineProps {
  center: number
  innerRadius: number
  innerCenter: number
}

export function Timeline({ center, innerCenter, innerRadius }: TimeLineProps) {
  const selectedDate = timeUtils.getDayByMs(center)
  const actualDate = timeUtils.getDayByMs(new Date().getTime())

  const days = timeUtils.getDaysRange(
    innerCenter - innerRadius * 2,
    innerCenter + innerRadius * 2
  )

  return days.map((day, i) => {
    const dayDate = new Date(day)
    const dayNumber = timeUtils.getDayByMs(day)

    const isActive =
      dayNumber === actualDate &&
      dayDate.getUTCMonth() === new Date(center).getUTCMonth() &&
      dayDate.getUTCFullYear() === new Date(center).getUTCFullYear()

    const translate = (day - innerCenter) / msPerPx

    console.log({ day, translate, innerCenter, i })

    return (
      <DayCard
        key={day}
        date={dayDate}
        translationX={translate}
        variant={isActive ? 'selected' : 'default'}
        handleClick={() => null}
      />
    )
  })
}
