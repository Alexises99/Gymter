interface ExerciseCardInfoProps {
  item: number
  name: string
}

export function ExerciseCardInfo({ item, name }: ExerciseCardInfoProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="p-bold">{item}</span>
      <span className="bg-grey-300 rounded-md p-1 text-foreground text-[12px] font-bold">
        {name}
      </span>
    </div>
  )
}
