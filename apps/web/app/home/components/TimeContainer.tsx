'use client'

import { useTimeTracker } from '../hooks/useTimeTracker'
import { Timeline } from './Timeline'

export function TimeContainer() {
  const {
    center,
    innerCenter,
    innerRadius,
    setCenter,
    changeInnerCenter,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove
  } = useTimeTracker()

  return (
    <section
      className="overflow-hidden relative flex h-56"
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseLeave={handleTouchEnd}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Timeline
        center={center}
        innerCenter={innerCenter}
        innerRadius={innerRadius}
      />
    </section>
  )
}
