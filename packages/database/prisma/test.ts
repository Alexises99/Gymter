import { prisma } from '@/client'

const appUsers = await prisma.appUser.findMany({
  where: { userId: null }
})

for (const appUser of appUsers) {
  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: appUser.name,
      email: `${appUser.name}@example.com` // temporal
    }
  })

  await prisma.appUser.update({
    where: { id: appUser.id },
    data: { userId: user.id }
  })
}
