<script lang="ts">
  import { urlParam } from 'fuma'
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
  <a
    role="tab"
    href={$urlParam.with({ groupBy: 'week' })}
    class="tab"
    class:tab-active={$urlParam.hasValue('groupBy', 'week')}
    data-sveltekit-noscroll
    data-sveltekit-replacestate
  >
    Semaine
  </a>
  <a
    role="tab"
    href={$urlParam.with({ groupBy: 'month' })}
    class="tab"
    class:tab-active={$urlParam.hasValue('groupBy', 'month')}
    data-sveltekit-noscroll
    data-sveltekit-replacestate
  >
    Mois
  </a>

  <a
    role="tab"
    href={$urlParam.with({ groupBy: 'year' })}
    class="tab"
    class:tab-active={$urlParam.hasValue('groupBy', 'year')}
    data-sveltekit-noscroll
    data-sveltekit-replacestate
  >
    Année
  </a>
</div>
