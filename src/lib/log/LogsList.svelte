<script lang="ts">
  import { LOG_TYPE } from '$lib/constant'
  import { renderAmount } from '$lib/utils'
  import type { Log } from '@prisma/client'
  import dayjs from 'dayjs'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import 'dayjs/locale/fr-ch'
  import { urlParam } from 'fuma'
  dayjs.locale('fr-ch')
  dayjs.extend(relativeTime)

  export let logs: Log[]
  export let logCount: number

  function getDuration(start: Date, end: Date): string {
    const minutes = dayjs(end).diff(start, 'minutes')
    const hours = Math.floor(minutes / 60)
    return [hours, minutes - hours * 60]
      .map((n) => n.toString().padStart(2, '0'))
      .join(':')
  }
</script>

<div class="flex flex-col gap-4">
  {#each logs as log}
    <a
      href="/br/{log.bankrollId}/log/{log.id}"
      class="bg-base-200 card-bordered flex flex-col gap-2 px-3 py-2 rounded"
    >
      <div class="flex gap-2">
        <div class="grow flex flex-col gap-1">
          <span class="text-sm font-medium">
            {LOG_TYPE[log.type]}
            {#if log.type === 'tours'}
              ( {log.position || '-'} / {log.players || '-'} )
            {/if}
          </span>
          <span class="text-xs opacity-70">
            {#if log.start}
              {dayjs().to(log.start)}
            {/if}

            {#if log.start && log.end}
              ( {getDuration(log.start, log.end)} )
            {/if}
          </span>
        </div>

        <span
          class="ml-auto"
          class:text-success={log.sold > 0}
          class:text-error={log.sold < 0}
        >
          {renderAmount(log.sold)}
        </span>
      </div>

      {#if log.comment}
        <p class="text-sm">{log.comment}</p>
      {/if}
    </a>
  {/each}

  {#if logs.length < logCount}
    <a
      class="btn"
      href={$urlParam.with({ take: +($urlParam.get('take') || 0) + 50 })}
      data-sveltekit-noscroll
      data-sveltekit-replacestate
    >
      Afficher plus ({logs.length} / {logCount})
    </a>
  {/if}
</div>
