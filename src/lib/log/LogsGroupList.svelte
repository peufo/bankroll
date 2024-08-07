<script lang="ts">
  import { renderAmount } from '$lib/utils'
  import dayjs from 'dayjs'
  import isoWeek from 'dayjs/plugin/isoWeek'
  import 'dayjs/locale/fr-ch'
  import type { LogsGroup, LogsGroupBy } from '.'
  dayjs.locale('fr-ch')
  dayjs.extend(isoWeek)

  export let logsGroup: LogsGroup[]
  export let groupBy: LogsGroupBy

  const dayjsFormat: Record<LogsGroupBy, (d: Date) => string> = {
    year: (d) => dayjs(d).format('[Année] YYYY'),
    month: (d) => dayjs(d).format('MMMM YYYY'),
    week: (d) => `Semaine ${dayjs(d).isoWeek()}`,
  }
</script>

<div class="flex flex-col gap-4">
  {#each logsGroup as logGroup (logGroup.start)}
    <div
      class="bg-base-200 card-bordered flex flex-col gap-2 px-3 py-2 rounded"
    >
      <div class="flex gap-2">
        <div class="grow flex flex-col gap-1">
          <span class="text-sm font-medium">
            {dayjsFormat[groupBy](logGroup.start)}
          </span>
          <span class="text-xs opacity-70">
            {logGroup.logsCount} entrées
          </span>
        </div>

        <span
          class="ml-auto"
          class:text-success={logGroup.sold > 0}
          class:text-error={logGroup.sold < 0}
        >
          {renderAmount(logGroup.sold)}
        </span>
      </div>
    </div>
  {/each}
</div>
