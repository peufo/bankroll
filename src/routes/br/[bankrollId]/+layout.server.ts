import { prisma } from '$lib/server/prisma.js'

export const load = async ({ params: { bankrollId }, parent, url }) => {
  const { user } = await parent()

  return {
    bankroll: await prisma.bankroll.findUniqueOrThrow({
      where: { id: bankrollId, ownerId: user.id },
      include: { _count: { select: { logs: true } } },
    }),
  }
}
