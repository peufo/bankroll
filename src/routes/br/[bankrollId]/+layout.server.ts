import { prisma } from '$lib/server/prisma.js'
import dayjs from 'dayjs'
import { z } from 'fuma'
import { parseQuery } from 'fuma/server'

export const load = async ({ params: { bankrollId }, parent, url }) => {
  const { user } = await parent()

  const { take } = parseQuery(url, { take: z.coerce.number().default(50) })

  const startOfWeek = dayjs().startOf('week').toDate()
  const startOfMonth = dayjs().startOf('month').toDate()

  return {
    bankroll: await prisma.bankroll.findUniqueOrThrow({
      where: { id: bankrollId, ownerId: user.id },
      include: {
        logs: { take, orderBy: { start: 'desc' } },
        _count: {
          select: {
            logs: true,
          },
        },
      },
    }),
    sold: {
      total: await prisma.log
        .aggregate({
          where: { bankrollId },
          _sum: { sold: true },
        })
        .then((res) => res._sum.sold),
      lastWeek: await prisma.log
        .aggregate({
          where: { bankrollId, start: { gte: startOfWeek } },
          _sum: { sold: true },
        })
        .then((res) => res._sum.sold),
      lastMonth: await prisma.log
        .aggregate({
          where: { bankrollId, start: { gte: startOfMonth } },
          _sum: { sold: true },
        })
        .then((res) => res._sum.sold),
    },
  }
}
