import { prisma } from '$lib/server/prisma.js'

export const load = async ({ params: { bankrollId }, parent }) => {
  const { user } = await parent()

  if (bankrollId === 'all')
    return {
      bankroll: await getBankrollAll(user.id),
    }
  return {
    bankroll: await prisma.bankroll.findUniqueOrThrow({
      where: { id: bankrollId, ownerId: user.id },
      include: { _count: { select: { logs: true } } },
    }),
  }
}

async function getBankrollAll(ownerId: string) {
  const logCount = await prisma.log.count({ where: { bankroll: { ownerId } } })
  return {
    id: 'all',
    name: 'Toutes les bankrolls',
    ownerId,
    createdAt: new Date(),
    _count: {
      logs: logCount,
    },
  }
}
