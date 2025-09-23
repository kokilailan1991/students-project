import { SIPCalculationParams, SIPPlan } from '@/types'

/**
 * Calculate SIP (Systematic Investment Plan) based on surplus and time horizon
 * Formula: FV = SIP × [((1+r)^n – 1) / r] × (1+r)
 * Where:
 * - FV = Future Value
 * - SIP = Monthly SIP amount
 * - r = Monthly interest rate (annual rate / 12)
 * - n = Number of months
 */

export interface SIPCalculationResult {
  monthly_sip: number
  expected_return_rate: number
  duration_years: number
  duration_months: number
  expected_future_value: number
  total_investment: number
  total_gains: number
}

/**
 * Calculate SIP for different time horizons
 */
export function calculateSIPPlans(
  monthlySurplus: number,
  customReturnRate?: number
): {
  short_term: SIPCalculationResult
  medium_term: SIPCalculationResult
  long_term: SIPCalculationResult
} {
  const shortTerm = calculateSIP({
    monthly_surplus: monthlySurplus,
    plan_type: 'short_term',
    expected_return_rate: customReturnRate
  })

  const mediumTerm = calculateSIP({
    monthly_surplus: monthlySurplus,
    plan_type: 'medium_term',
    expected_return_rate: customReturnRate
  })

  const longTerm = calculateSIP({
    monthly_surplus: monthlySurplus,
    plan_type: 'long_term',
    expected_return_rate: customReturnRate
  })

  return {
    short_term: shortTerm,
    medium_term: mediumTerm,
    long_term: longTerm
  }
}

/**
 * Calculate SIP for a specific plan type
 */
export function calculateSIP(params: SIPCalculationParams): SIPCalculationResult {
  const { monthly_surplus, plan_type, expected_return_rate } = params

  // Define plan parameters
  const planConfig = getPlanConfig(plan_type)
  
  // Use custom return rate if provided, otherwise use default
  const annualReturnRate = expected_return_rate || planConfig.defaultReturnRate
  const monthlyReturnRate = annualReturnRate / 100 / 12 // Convert to monthly decimal
  
  // Calculate SIP amount based on surplus percentage
  const monthlySIP = Math.round(monthly_surplus * planConfig.surplusPercentage)
  
  // Calculate duration in months
  const durationMonths = planConfig.durationYears * 12
  
  // Calculate future value using SIP formula
  const futureValue = calculateFutureValue(monthlySIP, monthlyReturnRate, durationMonths)
  
  // Calculate total investment
  const totalInvestment = monthlySIP * durationMonths
  
  // Calculate total gains
  const totalGains = futureValue - totalInvestment

  return {
    monthly_sip: monthlySIP,
    expected_return_rate: annualReturnRate,
    duration_years: planConfig.durationYears,
    duration_months: durationMonths,
    expected_future_value: Math.round(futureValue),
    total_investment: totalInvestment,
    total_gains: Math.round(totalGains)
  }
}

/**
 * Calculate future value using SIP formula
 * FV = SIP × [((1+r)^n – 1) / r] × (1+r)
 */
function calculateFutureValue(
  monthlySIP: number,
  monthlyReturnRate: number,
  durationMonths: number
): number {
  if (monthlyReturnRate === 0) {
    // If no return, just return total investment
    return monthlySIP * durationMonths
  }

  // SIP formula: FV = SIP × [((1+r)^n – 1) / r] × (1+r)
  const compoundFactor = Math.pow(1 + monthlyReturnRate, durationMonths)
  const sipFactor = (compoundFactor - 1) / monthlyReturnRate
  const futureValue = monthlySIP * sipFactor * (1 + monthlyReturnRate)

  return futureValue
}

/**
 * Get plan configuration based on type
 */
function getPlanConfig(planType: 'short_term' | 'medium_term' | 'long_term') {
  const configs = {
    short_term: {
      durationYears: 2, // 1-3 years average
      surplusPercentage: 0.20, // 20% of surplus
      defaultReturnRate: 8 // 8% annual return
    },
    medium_term: {
      durationYears: 5, // 3-7 years average
      surplusPercentage: 0.30, // 30% of surplus
      defaultReturnRate: 10 // 10% annual return
    },
    long_term: {
      durationYears: 10, // 7+ years
      surplusPercentage: 0.50, // 50% of surplus
      defaultReturnRate: 12 // 12% annual return
    }
  }

  return configs[planType]
}

/**
 * Calculate SIP for a specific goal amount
 */
export function calculateSIPForGoal(
  goalAmount: number,
  durationYears: number,
  expectedReturnRate: number = 10
): SIPCalculationResult {
  const monthlyReturnRate = expectedReturnRate / 100 / 12
  const durationMonths = durationYears * 12

  // Calculate required SIP amount to reach goal
  // Rearranged SIP formula: SIP = FV / [((1+r)^n – 1) / r] / (1+r)
  const compoundFactor = Math.pow(1 + monthlyReturnRate, durationMonths)
  const sipFactor = (compoundFactor - 1) / monthlyReturnRate
  const monthlySIP = goalAmount / (sipFactor * (1 + monthlyReturnRate))

  const totalInvestment = monthlySIP * durationMonths
  const totalGains = goalAmount - totalInvestment

  return {
    monthly_sip: Math.round(monthlySIP),
    expected_return_rate: expectedReturnRate,
    duration_years: durationYears,
    duration_months: durationMonths,
    expected_future_value: goalAmount,
    total_investment: Math.round(totalInvestment),
    total_gains: Math.round(totalGains)
  }
}

/**
 * Calculate SIP growth projection (monthly breakdown)
 */
export function calculateSIPProjection(
  monthlySIP: number,
  durationMonths: number,
  monthlyReturnRate: number
): Array<{
  month: number
  investment: number
  cumulative_investment: number
  returns: number
  cumulative_returns: number
  total_value: number
}> {
  const projection = []
  let cumulativeInvestment = 0
  let cumulativeReturns = 0

  for (let month = 1; month <= durationMonths; month++) {
    cumulativeInvestment += monthlySIP
    
    // Calculate returns for this month
    const monthlyReturns = cumulativeReturns * monthlyReturnRate
    cumulativeReturns += monthlyReturns + (monthlySIP * monthlyReturnRate)
    
    const totalValue = cumulativeInvestment + cumulativeReturns

    projection.push({
      month,
      investment: monthlySIP,
      cumulative_investment: Math.round(cumulativeInvestment),
      returns: Math.round(monthlyReturns),
      cumulative_returns: Math.round(cumulativeReturns),
      total_value: Math.round(totalValue)
    })
  }

  return projection
}

/**
 * Validate SIP calculation parameters
 */
export function validateSIPParams(params: SIPCalculationParams): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (params.monthly_surplus <= 0) {
    errors.push('Monthly surplus must be greater than 0')
  }

  if (params.monthly_surplus > 1000000) {
    errors.push('Monthly surplus seems unusually high. Please verify the amount.')
  }

  if (params.expected_return_rate !== undefined) {
    if (params.expected_return_rate < 0 || params.expected_return_rate > 30) {
      errors.push('Expected return rate should be between 0% and 30%')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Sample SIP calculation for testing
 */
export const sampleSIPCalculation = () => {
  const monthlySurplus = 15000 // ₹15,000 monthly surplus
  const plans = calculateSIPPlans(monthlySurplus)
  
  console.log('Sample SIP Plans for ₹15,000 monthly surplus:')
  console.log('Short Term (2 years, 8% return):', plans.short_term)
  console.log('Medium Term (5 years, 10% return):', plans.medium_term)
  console.log('Long Term (10 years, 12% return):', plans.long_term)
  
  return plans
}
