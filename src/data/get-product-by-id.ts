import { db } from '@/lib/prisma'

export const getProductWithRestaurantById = async (id: string) => {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      restaurant: {
        select: {
          avatarImageUrl: true,
          name: true,
        },
      },
    },
  })

  return { product }
}
