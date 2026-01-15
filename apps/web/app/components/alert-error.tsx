import { IconExclamationCircle } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

interface AlertErrorProps {
  message?: string
}

export function AlertError({ message }: AlertErrorProps) {
  const t = useTranslations('Common')
  return (
    <div
      className="flex items-center gap-3 p-4 max-w-md rounded-lg border-2 border-error bg-red-50 text-red-600 shadow-lg shadow-red-400/30 dark:bg-mix-error-surface dark:border-red-400 dark:text-error animate-slideDownFade"
      role="alert"
      aria-live="assertive"
    >
      <IconExclamationCircle />
      <span>{message || t('error')}</span>
    </div>
  )
}
