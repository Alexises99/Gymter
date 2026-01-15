'use client'

import {
  IconBrandGoogleFilled,
  IconBrandDiscordFilled
} from '@tabler/icons-react'

import { useTranslations } from 'next-intl'
import { ElementType } from 'react'

import { AUTH_PROVIDERS } from '@/auth/providers'
import { signInWithOAuth } from '@/app/actions/auth'

interface OAuthButtonProps {
  provider: keyof typeof AUTH_PROVIDERS
}

export function OAuthButton({ provider }: OAuthButtonProps) {
  const t = useTranslations('LoginPage')
  const providersLogos: Record<keyof typeof AUTH_PROVIDERS, ElementType> = {
    google: IconBrandGoogleFilled,
    discord: IconBrandDiscordFilled
  }

  const Logo = providersLogos[provider]

  const label = t('continueWith', {
    provider: provider.charAt(0).toUpperCase() + provider.slice(1)
  })

  return (
    <button
      className="button-base button-secondary"
      onClick={() => signInWithOAuth(provider)}
    >
      <Logo className="text-primary-600" />
      {label}
    </button>
  )
}
