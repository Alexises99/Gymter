import timeUtils from '@/utils/time'
import {
  useEffect,
  useRef,
  useState,
  TouchEvent,
  MouseEvent,
  useCallback
} from 'react'
import { msPerPx } from '../components/Timeline'

export function useTimeTracker() {
  const [newCenter, newRadius] = timeUtils.initializeRangeDays(3, new Date())

  const [center, setCenter] = useState<number>(newCenter)
  const [dragging, setDragging] = useState<boolean>(false)
  const [[innerCenter, innerRadius], setInnerRange] = useState<
    [number, number]
  >([newCenter, newRadius])

  const rangeRecord = useRef<{ x: number; center: number }>({
    center: 0,
    x: 0
  })

  const handleTouchStart = (e: TouchEvent | MouseEvent) => {
    setDragging(true)
    rangeRecord.current = {
      center: innerCenter,
      x: 'touches' in e ? e.targetTouches[0].pageX : e.pageX
    }
  }

  const handleTouchMove = (e: TouchEvent | MouseEvent) => {
    if (!dragging) return
    const x = 'touches' in e ? e.touches[0].pageX : e.pageX
    const walk = rangeRecord.current.x - x

    const val = walk * msPerPx

    const prev = rangeRecord.current.center + val

    setInnerRange([prev, innerRadius])
  }

  const handleTouchEnd = useCallback(() => setDragging(false), [])

  const changeInnerCenter = (center: number) =>
    setInnerRange((prev) => [center, prev[1]])

  return {
    center,
    innerCenter,
    innerRadius,
    setCenter,
    changeInnerCenter,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  }
}
