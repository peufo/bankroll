<script lang="ts">
  import { mdiPencilOutline, mdiPlus } from '@mdi/js'
  import { Icon, urlParam } from 'fuma'
  import { BankrollCard } from '$lib/bankroll'
  import { LogsList, type LogsGroupBy } from '$lib/log'
  import TabGroupBy from './TabGroupBy.svelte'
  import LogsGroupList from '$lib/log/LogsGroupList.svelte'

  export let data

  let groupBy: LogsGroupBy | null = null
  urlParam.subscribe(({ get }) => (groupBy = get('groupBy') as LogsGroupBy))
</script>

<div class="mx-auto max-w-md p-4">
  <BankrollCard bankroll={data.bankroll} sold={data.sold}>
    <div class="flex gap-2 ml-auto" slot="actions">
      {#if data.bankroll.id !== 'all'}
        <a href="/br/{data.bankroll.id}/edit" class="btn btn-square">
          <Icon path={mdiPencilOutline} />
        </a>
        <a href="/br/{data.bankroll.id}/log" class="btn btn-square">
          <Icon path={mdiPlus} />
        </a>
      {/if}
    </div>

    <div class="divider"></div>

    <TabGroupBy />

    {#if !groupBy}
      <LogsList logs={data.logs} logCount={data.bankroll._count.logs} />
    {:else}
      <LogsGroupList logsGroup={data.logsGroups} {groupBy} />
    {/if}
  </BankrollCard>
</div>
