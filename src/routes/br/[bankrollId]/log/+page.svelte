<script lang="ts">
  import { LogForm } from '$lib/log'

  export let data
</script>

<div class="mx-auto max-w-sm p-4">
  <h2 class="text-lg text-center my-4">
    Nouvelle entrée dans <b>{data.bankroll.name}</b>
  </h2>

  <LogForm />
</div>
