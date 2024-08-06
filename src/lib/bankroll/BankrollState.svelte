<script lang="ts">
  import { mdiArrowDown, mdiArrowUp } from '@mdi/js'
  import { Icon } from 'fuma'

  type Range = 'total' | 'year' | 'month' | 'week'

  export let range: Range
  let value = Math.round((Math.random() - 0.5) * 1000)
</script>

<div>
  <h3 class="text-sm font-medium opacity-70">{range}</h3>

  <div class="flex items-center gap-1 font-mono">
    {#if value > 0}
      <Icon path={mdiArrowUp} class="fill-success"></Icon>
      <span>{value}</span>
    {:else if value < 0}
      <Icon path={mdiArrowDown} class="fill-error"></Icon>
      <span>{value}</span>
    {:else}
      <span>0</span>
    {/if}
  </div>
</div>
