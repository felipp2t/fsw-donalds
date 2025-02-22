import { removeCpfPunctuation } from '@/app/[slug]/menu/helpers/cpf'
import { db } from '@/lib/prisma'

export const getOrdersByCpf = async (cpf: string) => {
  const orders = await db.order.findMany({
    where: { costumerCpf: removeCpfPunctuation(cpf) },
    include: {
      restaurant: {
        select: { avatarImageUrl: true, name: true },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  })

  return { orders }
}
