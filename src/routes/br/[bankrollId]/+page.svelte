<script lang="ts">
  import { BankrollCard } from '$lib/bankroll'
  import { mdiPlus } from '@mdi/js'
  import { Icon } from 'fuma'

  export let data
</script>

<div class="mx-auto max-w-sm p-4">
  <BankrollCard bankroll={data.bankroll}>
    <a
      slot="actions"
      href="/br/{data.bankroll.id}/log"
      class="btn btn-square ml-auto"
    >
      <Icon path={mdiPlus} />
    </a>

    <p>Liste des logs</p>
  </BankrollCard>
</div>
