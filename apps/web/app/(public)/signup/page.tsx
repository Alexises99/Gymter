'use client'

import { signUp } from '@/app/actions/auth'
import { AlertError } from '@/app/components/alert-error'

import { useTranslations } from 'next-intl'
import { useActionState } from 'react'

export default function SignupPage() {
  const t = useTranslations('SignupPage')
  const [state, formAction, isPending] = useActionState(signUp, null)

  return (
    <main className="px-6 flex flex-col min-h-dvh">
      <div className="flex-1 flex flex-col gap-8 justify-center">
        <header>
          <h2 className="text-center h2">Sign Up</h2>
        </header>
        <form className="flex flex-col gap-4" action={formAction}>
          {state?.error && <AlertError message={state.error} />}
          <input
            type="text"
            placeholder={t('name')}
            name="name"
            autoComplete="name"
            required
          />
          <input
            type="email"
            placeholder={t('email')}
            name="email"
            autoComplete="email"
            required
          />
          <input
            type="password"
            placeholder={t('password')}
            name="password"
            autoComplete="current-password"
            required
          />
          <label className="flex gap-3 items-center p-mini">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="mr-2"
              required
            />
            {t('caption')}
          </label>

          <button
            type="submit"
            className="button-base button-primary text-lg mt-4"
            disabled={isPending}
          >
            {isPending ? t('signupLoading') : t('signupButton')}
          </button>
        </form>
      </div>
      <footer className="mb-8">
        <p className="text-center text-md text-gray-500">{t('footerText')}</p>
      </footer>
    </main>
  )
}
