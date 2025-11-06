import { IconMenu2 } from '@tabler/icons-react'
import Image from 'next/image'

export function Header() {
  return (
    <header className="p-4 pb-6 flex items-center justify-between">
      <Image
        src="/avatars/toby.jpg"
        alt="Toby the dog"
        width={54}
        height={54}
        className="rounded-lg aspect-square object-cover"
      />
      <IconMenu2 color="black" />
    </header>
  )
}
