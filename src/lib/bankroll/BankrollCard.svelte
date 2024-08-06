<script lang="ts">
  import BankrollState from './BankrollState.svelte'
</script>

<div class="card bg-base-300 shadow-md">
  <div class="card-body">
    <h2 class="card-title">Montreux</h2>

    <div class="flex gap-4 overflow-auto">
      <BankrollState range="total" />
      <div class="border-r border-base-100" />
      <BankrollState range="month" />
      <div class="border-r border-base-100" />
      <BankrollState range="week" />
    </div>

    <slot />
  </div>
</div>
