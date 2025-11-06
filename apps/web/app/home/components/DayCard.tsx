'use client'

type Variant = 'default' | 'selected' | 'disabled'

interface DayCardProps {
  date: Date
  handleClick: () => void
  translationX?: number
  variant?: Variant
}

export function DayCard({
  date,
  handleClick,
  translationX = 0,
  variant = 'default'
}: DayCardProps) {
  const variants: Record<Variant, string> = {
    default: 'bg-primary-200',
    selected: 'bg-primary-400',
    disabled: 'bg-gray-200'
  } as const

  return (
    <button
      className={`${variants[variant]} w-14 aspect-square rounded-lg flex flex-col items-center justify-center text-black shrink-0 absolute left-1/2`}
      onClick={handleClick}
      style={{ transform: `translateX(${translationX}px)` }}
    >
      <span className=" p-medium">
        {date.toLocaleDateString('default', { day: 'numeric' })}
      </span>
      <span className="p-mini">
        {date.toLocaleString('default', { weekday: 'short' })}
      </span>
    </button>
  )
}
