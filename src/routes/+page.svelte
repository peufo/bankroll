<script lang="ts">
  import { mdiPlus } from '@mdi/js'
  import { Icon } from 'fuma'
  import { BankrollCard, BankrollStats, type BankrollSold } from '$lib/bankroll'

  export let data

  function sumOfSold(key: keyof BankrollSold): number {
    return Object.entries(data.solds).reduce(
      (acc, [bankrollId, sold]) => acc + (sold[key] || 0),
      0
    )
  }
</script>

<div class="p-4 pb-20 flex flex-col gap-4 items-center">
  <div class="flex gap-6 overflow-auto p-4">
    <BankrollStats name="Total" value={sumOfSold('total')} />
    <div class="border-r border-base-100" />
    <BankrollStats name="Mois" value={sumOfSold('lastMonth')} />
    <div class="border-r border-base-100" />
    <BankrollStats name="Semaine" value={sumOfSold('lastWeek')} />
  </div>

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
