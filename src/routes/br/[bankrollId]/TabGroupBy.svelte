<script lang="ts">
  import { urlParam } from 'fuma'

  const groups = [
    { key: 'day', label: 'Jour' },
    { key: 'week', label: 'Semaine' },
    { key: 'month', label: 'Mois' },
    { key: 'year', label: 'Année' },
  ]
</script>

<div role="tablist" class="tabs tabs-boxed -translate-y-3">
  <a
    role="tab"
    class="tab"
    href={$urlParam.without('groupBy')}
    class:tab-active={!$urlParam.has('groupBy')}
    data-sveltekit-noscroll
    data-sveltekit-replacestate
  >
    Tous
  </a>
  {#each groups as { key, label }}
    <a
      role="tab"
      href={$urlParam.with({ groupBy: key })}
      class="tab"
      class:tab-active={$urlParam.hasValue('groupBy', key)}
      data-sveltekit-noscroll
      data-sveltekit-replacestate
    >
      {label}
    </a>
  {/each}
</div>
