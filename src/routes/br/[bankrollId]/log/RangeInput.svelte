<script lang="ts">
  import dayjs from 'dayjs'
  import 'dayjs/locale/fr-ch'
  dayjs.locale('fr-ch')
  import { InputDate, InputText, InputTime, USE_COERCE_DATE } from 'fuma'

  export let defaultStart = dayjs().subtract(2, 'hour').toDate()
  export let defaultEnd = new Date()
  defaultEnd.setDate(defaultStart.getDate())

  export let start: Date = defaultStart
  export let end: Date = defaultEnd

  $: addADay = !!start && !!end && end.getHours() < start.getHours()

  export function setRange(range?: Partial<{ start: Date; end: Date }> | null) {
    start = range?.start || defaultStart
    end = range?.end || defaultEnd
  }

  function getDuration(
    _start: Date | undefined,
    _end: Date | undefined,
    _addADay: boolean
  ): string {
    if (!_start || !_end) return '00:00'
    const minutes = dayjs(dayjs(_end).add(+_addADay, 'day')).diff(
      _start,
      'minutes'
    )
    const hours = Math.floor(minutes / 60)
    return [hours, minutes - hours * 60]
      .map((n) => n.toString().padStart(2, '0'))
      .join(':')
  }
</script>

<div class="flex gap-2">
  <input
    type="hidden"
    name="start"
    value="{USE_COERCE_DATE}{start?.toJSON()}"
  />
  <input
    type="hidden"
    name="end"
    value="{USE_COERCE_DATE}{dayjs(end).add(+addADay, 'day').toJSON()}"
  />

  <InputTime label="Début" bind:value={start} />
  <InputTime
    label="Fin"
    bind:value={end}
    hint={addADay ? 'Le jour suivant' : ''}
  />
  <InputText
    value={getDuration(start, end, addADay)}
    label="Durée"
    input={{ disabled: true }}
  />
</div>

<div class="flex gap-2">
  <InputDate
    label="Date"
    bind:value={start}
    on:input={() => {
      const _end = new Date(start)
      _end.setHours(end.getHours(), end.getMinutes())
      end = _end
    }}
  />
</div>
