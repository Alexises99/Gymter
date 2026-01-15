import { PropsWithChildren } from 'react'
import { ProtectedHeader } from '../components/header'
import { auth } from '@/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function LayoutProtected({ children }: PropsWithChildren) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session) {
    redirect('/login')
  }

  return (
    <>
      <ProtectedHeader />
      {children}
    </>
  )
}
