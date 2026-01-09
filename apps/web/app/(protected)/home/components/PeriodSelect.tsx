import {
  IconCaretDown,
  IconCaretDownFilled,
  IconChevronCompactDown
} from '@tabler/icons-react'

import iconDown from '@/public/arrow-down.svg'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function PeriodSelect() {
  const t = useTranslations('HomePage')
  return (
    <div className="flex items-center p text-black justify-end pr-4 gap-2">
      {/* <Image src={iconDown} alt="Arrow down" width={18} height={18} />
      <span>{t('time.period.label')}</span> */}
      <select name="period" id="period">
        <option value="day">{t('time.period.day')}</option>
        <option value="week">{t('time.period.week')}</option>
        <option value="month">{t('time.period.month')}</option>
      </select>
    </div>
  )
}
