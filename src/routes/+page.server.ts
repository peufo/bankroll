import type { BankrollSold } from '$lib/bankroll/index.js'
import { prisma } from '$lib/server'
import type { Bankroll } from '@prisma/client'
import { redirect } from '@sveltejs/kit'
import dayjs from 'dayjs'

export const load = async ({ locals: { user } }) => {
  if (!user) redirect(303, '/auth')
  const bankrolls = await prisma.bankroll.findMany({
    where: { ownerId: user.id },
  })
  return {
    bankrolls,
    solds: await getSolds(user.id, bankrolls),
  }
}

async function getSolds(
  ownerId: string,
  bankrolls: Bankroll[]
): Promise<Record<string, BankrollSold>> {
  const startOfWeek = dayjs().startOf('week').toDate()
  const startOfMonth = dayjs().startOf('month').toDate()

  const [total, lastWeek, lastMonth] = await Promise.all([
    prisma.log.groupBy({
      by: ['bankrollId'],
      where: { bankroll: { ownerId } },
      _sum: { sold: true },
    }),
    prisma.log.groupBy({
      by: ['bankrollId'],
      where: { bankroll: { ownerId }, start: { gte: startOfWeek } },
      _sum: { sold: true },
    }),
    prisma.log.groupBy({
      by: ['bankrollId'],
      where: { bankroll: { ownerId }, start: { gte: startOfMonth } },
      _sum: { sold: true },
    }),
  ]).then((res) => res.map(toRecord))

  function toRecord(
    agg: { bankrollId: string; _sum: { sold: number | null } }[]
  ): Record<string, number | null> {
    return agg.reduce(
      (acc, cur) => ({ ...acc, [cur.bankrollId]: cur._sum.sold }),
      {}
    )
  }

  return bankrolls.reduce(
    (solds, { id }) => ({
      ...solds,
      [id]: {
        total: total[id],
        lastWeek: lastWeek[id],
        lastMonth: lastMonth[id],
      },
    }),
    {}
  )
}
