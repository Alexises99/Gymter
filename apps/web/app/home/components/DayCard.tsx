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
      className={`${variants[variant]} w-14 aspect-square rounded-lg flex flex-col gap-1 items-center justify-center text-black shrink-0 absolute left-[calc(50%-28px)]`}
      onClick={handleClick}
      style={{ transform: `translateX(${translationX}px)` }}
    >
      <span className="p-bold">
        {date.toLocaleDateString('default', { day: '2-digit' })}
      </span>
      <span className="p-mini">
        {date.toLocaleString('default', { weekday: 'short' })}
      </span>
    </button>
  )
}
