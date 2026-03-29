export const WORKER_MONTHLY_RS = 100
export const WORKER_YEARLY_RS = 1000

const monthlyAnnualTotal = WORKER_MONTHLY_RS * 12

export const WORKER_YEARLY_SAVINGS_RS = monthlyAnnualTotal - WORKER_YEARLY_RS

export const WORKER_YEARLY_SAVINGS_PCT = Math.round(
  (WORKER_YEARLY_SAVINGS_RS / monthlyAnnualTotal) * 100,
)
