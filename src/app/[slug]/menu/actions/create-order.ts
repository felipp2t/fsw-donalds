'use server'

import { db } from '@/lib/prisma'
import type { ConsumptionMethod } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { removeCpfPunctuation } from '../helpers/cpf'

interface createOrderProps {
  customerName: string
  customerCpf: string
  products: Array<{
    id: string
    quantity: number
  }>
  consumptionMethod: ConsumptionMethod
  slug: string
}

export const createOrder = async (input: createOrderProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  })

  if (!restaurant) {
    throw new Error('Restaurant not found')
  }

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map(product => product.id),
      },
    },
  })

  const productsWithPricesAndQuantities = input.products.map(product => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find(p => p.id === product.id)!.price,
  }))

  await db.order.create({
    data: {
      status: 'PENDING',
      costumerName: input.customerName,
      costumerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total: productsWithPricesAndQuantities.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      ),
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
    },
  })
  revalidatePath(`/${input.slug}/orders`)

  redirect(
    `/${input.slug}/orders?cpf=${removeCpfPunctuation(input.customerCpf)}`
  )
}
