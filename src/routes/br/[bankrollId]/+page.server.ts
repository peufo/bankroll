import type { LogsGroup } from '$lib/log'
import { prisma } from '$lib/server/prisma.js'
import dayjs from 'dayjs'
import { z } from 'fuma'
import { parseQuery } from 'fuma/server'

export const load = async ({ params: { bankrollId }, parent, url }) => {
  const { bankroll } = await parent()

  const { take, groupBy } = parseQuery(url, {
    take: z.coerce.number().default(50),
    groupBy: z.enum(['week', 'month', 'year']).optional(),
  })

  const startOfWeek = dayjs().startOf('week').toDate()
  const startOfMonth = dayjs().startOf('month').toDate()

  return {
    logs: await prisma.log.findMany({
      where: { bankrollId: bankroll.id },
      take,
      orderBy: { start: 'desc' },
    }),
    logsGroups: await getLogsGroups(bankroll.id, groupBy),
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

// On verra plus tard la pagination et l'optimisation
async function getLogsGroups(
  bankrollId: string,
  groupBy: 'week' | 'month' | 'year' | undefined
): Promise<LogsGroup[]> {
  if (groupBy === undefined) return []

  const logs = await prisma.log.findMany({
    where: { bankrollId },
    orderBy: { start: 'asc' },
  })
  if (logs.length === 0) return []

  let start = dayjs(logs[0].start).startOf(groupBy)
  let end = start.endOf(groupBy)
  const now = new Date()
  const groups: LogsGroup[] = []

  while (start.isBefore(now)) {
    const startTime = start.toDate().getTime()
    const endTime = end.toDate().getTime()
    const groupLogs = logs.filter((log) => {
      const time = log.start.getTime()
      return startTime < time && time < endTime
    })

    groups.push({
      start: start.toDate(),
      end: end.toDate(),
      logsCount: groupLogs.length,
      sold: groupLogs.reduce((acc, cur) => acc + cur.sold, 0),
    })

    start = start.add(1, groupBy)
    end = end.add(1, groupBy)
  }

  return groups.toReversed()
}
