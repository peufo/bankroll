import { prisma } from '$lib/server/prisma.js'
import { z } from 'fuma'
import { parseQuery } from 'fuma/server'

export const load = async ({ params: { bankrollId }, parent, url }) => {
  const { user } = await parent()

  const { take } = parseQuery(url, { take: z.coerce.number().default(50) })

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
  }
}
