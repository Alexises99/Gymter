import { Kdam_Thmor_Pro } from 'next/font/google'
import Image from 'next/image'
import logo from '@public/logo.svg'
import homeBg from '@public/home_bg.webp'
import { Button } from '@/components/ui/button'

const kdamThmor = Kdam_Thmor_Pro({
  variable: '--font-kdam-thmor',
  weight: '400',
  subsets: ['latin']
})

export default function Home() {
  return (
    <main className="relative w-full h-screen">
      <Image
        src={homeBg}
        alt="Men"
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-between p-4">
        <Image src={logo} alt="Gymter logo" className="mt-12" />
        <div className="mb-12 flex flex-col gap-6 items-center">
          <h2 className={`${kdamThmor.className} text-3xl text-center`}>
            KEEP YOUR RECORDS, REACH YOUR LIMITS
          </h2>
          <p className="text-lg">The best record app to enhace your progress</p>
          <Button className="bg-yellow-300 w-full text-lg py-7 font-bold">
            ENJOY THE PROCESS
          </Button>
          <p className="text-lg">
            Dont have an account?
            <Button variant="link" className="p-2 text-yellow-300 text-lg">
              Sign up
            </Button>
          </p>
        </div>
      </div>
    </main>
  )
}
