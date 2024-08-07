<script lang="ts">
  import { LogForm } from '$lib/log'
  export let data
</script>

<div class="mx-auto max-w-sm p-4">
  <h2 class="text-lg text-center my-4">
    Modification d'une entrée dans <b>{data.bankroll.name}</b>
  </h2>

  <LogForm log={data.log} />
</div>
