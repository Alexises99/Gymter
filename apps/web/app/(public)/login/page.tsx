'use client'

import { useTranslations } from 'next-intl'
import { OAuthButton } from './components/OAuthButton'
import { signIn } from '@/app/actions/auth'
import { useActionState } from 'react'
import { AlertError } from '@/app/components/alert-error'

export default function LoginPage() {
  const t = useTranslations('LoginPage')

  const [state, formAction, isPending] = useActionState(signIn, null)

  return (
    <main className="px-6 flex flex-col min-h-dvh">
      <div className="flex-1 flex flex-col gap-8 justify-center">
        <header>
          <h1 className="text-center h1">GYMTER</h1>
        </header>
        <form className="flex flex-col gap-4" action={formAction}>
          {state?.error && <AlertError message={state.error} />}
          <input
            type="email"
            placeholder={t('email')}
            name="email"
            autoComplete="email"
          />
          <input
            type="password"
            placeholder={t('password')}
            name="password"
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="button-base button-primary text-lg mt-4"
            disabled={isPending}
          >
            {t('loginButton')}
          </button>
        </form>
      </div>
      <section className="flex flex-col gap-4 self-end pb-8 w-full">
        <OAuthButton provider="google" />
        <OAuthButton provider="discord" />
        <button className="button-base button-ghost text-sm">
          <span>
            Does not have an account?{' '}
            <span className="underline">Sign Up here</span>
          </span>
        </button>
      </section>
    </main>
  )
}
