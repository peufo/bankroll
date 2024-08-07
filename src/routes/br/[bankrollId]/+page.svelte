<script lang="ts">
  import { mdiPlus } from '@mdi/js'
  import { Icon } from 'fuma'
  import { BankrollCard } from '$lib/bankroll'
  import { LogsList } from '$lib/log'
  import TabGroupBy from './TabGroupBy.svelte'

  export let data
</script>

<div class="mx-auto max-w-md p-4">
  <BankrollCard bankroll={data.bankroll} sold={data.sold}>
    <a
      slot="actions"
      href="/br/{data.bankroll.id}/log"
      class="btn btn-square ml-auto"
    >
      <Icon path={mdiPlus} />
    </a>

    <div class="divider"></div>

    <TabGroupBy />

    <LogsList logs={data.bankroll.logs} logCount={data.bankroll._count.logs} />
  </BankrollCard>
</div>
