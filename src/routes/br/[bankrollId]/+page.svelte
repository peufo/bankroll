<script lang="ts">
  import { mdiPlus } from '@mdi/js'
  import { Icon, urlParam } from 'fuma'
  import { BankrollCard } from '$lib/bankroll'
  import { LogsList } from '$lib/log'

  export let data
</script>

<div class="mx-auto max-w-md p-4">
  <BankrollCard bankroll={data.bankroll}>
    <a
      slot="actions"
      href="/br/{data.bankroll.id}/log"
      class="btn btn-square ml-auto"
    >
      <Icon path={mdiPlus} />
    </a>

    <div class="divider"></div>

    <div role="tablist" class="tabs tabs-boxed -translate-y-3">
      <a
        role="tab"
        href={$urlParam.without('groupBy')}
        class="tab"
        class:tab-active={!$urlParam.has('groupBy')}
      >
        Tous
      </a>
      <a
        role="tab"
        href={$urlParam.with({ groupBy: 'week' })}
        class="tab"
        class:tab-active={$urlParam.hasValue('groupBy', 'week')}
      >
        Semaine
      </a>
      <a
        role="tab"
        href={$urlParam.with({ groupBy: 'month' })}
        class="tab"
        class:tab-active={$urlParam.hasValue('groupBy', 'month')}
      >
        Mois
      </a>

      <a
        role="tab"
        href={$urlParam.with({ groupBy: 'year' })}
        class="tab"
        class:tab-active={$urlParam.hasValue('groupBy', 'year')}
      >
        Année
      </a>
    </div>

    <LogsList logs={data.bankroll.logs} />
  </BankrollCard>
</div>
