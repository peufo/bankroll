<script lang="ts">
  import { mdiPlus } from '@mdi/js'
  import { Icon } from 'fuma'
  import { BankrollCard } from '$lib/bankroll'

  export let data
</script>

<div class="p-4 pb-20 flex flex-col gap-4 items-center">
  <div
    class="grid gap-4 p-4 w-full"
    style="grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr))"
  >
    {#each data.bankrolls as bankroll}
      <BankrollCard {bankroll} sold={data.solds[bankroll.id]} isClickable />
    {/each}
  </div>

  <a class="btn" href="/br">
    <Icon path={mdiPlus} />
    <span>Ajouter une bankroll</span>
  </a>
</div>
