type OAuthProvider = 'google' | 'discord'

import {
  IconBrandGoogleFilled,
  IconBrandDiscordFilled
} from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { ElementType } from 'react'

interface OAuthButtonProps {
  provider: OAuthProvider
}

export function OAuthButton({ provider }: OAuthButtonProps) {
  const t = useTranslations('LoginPage')
  const providersLogos: Record<OAuthProvider, ElementType> = {
    google: IconBrandGoogleFilled,
    discord: IconBrandDiscordFilled
  }

  const Logo = providersLogos[provider]

  const label = t('continueWith', {
    provider: provider.charAt(0).toUpperCase() + provider.slice(1)
  })

  return (
    <button className="flex gap-2 w-full justify-center bg-surface p-2 rounded-md p-medium items-center">
      <Logo className="text-primary-600" />
      {label}
    </button>
  )
}
