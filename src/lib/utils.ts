export function renderAmount(
  amount?: number | string,
  currency?: string
): string {
  if (amount === undefined) return '-'
  amount = +amount
  if (isNaN(amount)) return '-'

  return amount.toLocaleString(
    undefined,
    currency
      ? {
          style: 'currency',
          currency,
        }
      : {
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }
  )
}
