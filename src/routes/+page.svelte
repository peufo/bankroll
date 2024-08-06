<script lang="ts">
  import { BankrollCard } from '$lib/bankroll'
  import { mdiPlus } from '@mdi/js'
  import { Icon } from 'fuma'
</script>

<div class="p-4 pb-20 flex flex-col gap-4 items-center">
  <div
    class="grid gap-4 p-4 w-full"
    style="grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr))"
  >
    <BankrollCard />
    <BankrollCard />
    <BankrollCard />
    <BankrollCard />
  </div>

  <a class="btn" href="/br/create">
    <Icon path={mdiPlus} />
    <span>Ajouter une bankroll</span>
  </a>
</div>
