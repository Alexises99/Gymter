'use server'

import { auth } from '@/auth'
import { AUTH_PROVIDERS } from '@/auth/providers'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signIn(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  console.log('Signing in with', { email, password })

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password
      }
    })

    return { success: true }
  } catch (error: any) {
    const errorMessage =
      error?.body?.message || error?.message || 'Failed to sign in'
    return { error: errorMessage, success: false }
  }
}

export async function signInWithOAuth(provider: keyof typeof AUTH_PROVIDERS) {
  const response = await auth.api.signInSocial({
    body: {
      provider: AUTH_PROVIDERS[provider],
      callbackURL: '/home'
    }
  })

  if (response?.url) {
    redirect(response.url)
  }
}

export async function signUp(
  prevState: { error?: string; success?: boolean } | null,
  formData: FormData
) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string

  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password
      }
    })

    redirect('/home')
  } catch (error: any) {
    const errorMessage =
      error?.body?.message || error?.message || 'Failed to sign up'
    return { error: errorMessage, success: false }
  }
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers()
  })

  redirect('/login')
}
