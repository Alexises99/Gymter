import { PropsWithChildren } from 'react'
import { ProtectedHeader } from '../components/header'

export function LayoutProtected({ children }: PropsWithChildren) {
  return (
    <>
      <ProtectedHeader />
      {children}
    </>
  )
}
