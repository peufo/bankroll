export { default as LogsList } from './LogsList.svelte'
export { default as LogsGroupList } from './LogsGroupList.svelte'
export { default as LogForm } from './LogForm.svelte'

export type LogsGroup = {
  start: Date
  end: Date
  sold: number
  logsCount: number
}

export type LogsGroupBy = 'day' | 'year' | 'month' | 'week'
