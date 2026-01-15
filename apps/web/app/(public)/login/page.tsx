import { useTranslations } from 'next-intl'
import { OAuthButton } from './components/OAuthButton'

export default function LoginPage() {
  const t = useTranslations('LoginPage')

  return (
    <main className="px-6 flex flex-col min-h-dvh">
      <div className="flex-1 flex flex-col gap-8 justify-center">
        <header>
          <h1 className="text-center h1">GYMTER</h1>
        </header>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder={t('email')}
            name="email"
            autoComplete="email"
            className="border w-full p-large p-2 rounded-md bg-surface text-primary-700 placeholder:pl-1"
          />
          <input
            type="password"
            placeholder={t('password')}
            name="password"
            autoComplete="current-password"
            className="border w-full p-large p-2 rounded-md bg-surface text-primary-700 placeholder:pl-1"
          />
          <button
            type="submit"
            className="button-base button-primary text-lg mt-4"
          >
            {t('loginButton')}
          </button>
        </form>
      </div>
      <section className="flex flex-col gap-4 self-end pb-8 w-full">
        <OAuthButton provider="google" />
        <OAuthButton provider="discord" />
      </section>
    </main>
  )
}
