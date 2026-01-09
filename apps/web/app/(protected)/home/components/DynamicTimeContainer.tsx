'use client'

import dynamic from 'next/dynamic'
import { TimeContainer } from './TimeContainer'

export const DynamicTimeContainer = dynamic(
  () => Promise.resolve(TimeContainer),
  {
    ssr: false
  }
)
