import { prisma } from '@/client'
import bcrypt from 'bcryptjs'

async function main() {
  const accounts = await prisma.account.findMany({
    where: { providerId: 'credentials' }
  })

  for (const account of accounts) {
    // Solo rehace hash si parece texto plano
    if (!account.password?.startsWith('$2')) {
      const hashed = await bcrypt.hash(account.password!, 10)
      await prisma.account.update({
        where: { id: account.id },
        data: { password: hashed }
      })
      console.log(`✅ Contraseña hasheada para ${account.accountId}`)
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
