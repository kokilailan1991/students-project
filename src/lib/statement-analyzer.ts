import { ParsedTransaction, StatementAnalysis, CategoryBreakdown, TransactionCategory } from '@/types'

/**
 * Analyze parsed bank statement transactions and generate insights
 */

export function analyzeStatement(
  transactions: ParsedTransaction[],
  periodStart: string,
  periodEnd: string
): StatementAnalysis {
  // Filter transactions by date range
  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date)
    const startDate = new Date(periodStart)
    const endDate = new Date(periodEnd)
    return transactionDate >= startDate && transactionDate <= endDate
  })

  // Calculate totals
  const totalIncome = calculateTotalIncome(filteredTransactions)
  const totalExpenses = calculateTotalExpenses(filteredTransactions)
  const monthlySurplus = totalIncome - totalExpenses

  // Calculate averages (assuming monthly data)
  const monthsInPeriod = calculateMonthsInPeriod(periodStart, periodEnd)
  const averageIncome = totalIncome / monthsInPeriod
  const averageExpenses = totalExpenses / monthsInPeriod

  // Generate category breakdown
  const categoryBreakdown = generateCategoryBreakdown(filteredTransactions)

  return {
    total_income: Math.round(totalIncome),
    total_expenses: Math.round(totalExpenses),
    monthly_surplus: Math.round(monthlySurplus),
    average_income: Math.round(averageIncome),
    average_expenses: Math.round(averageExpenses),
    category_breakdown: categoryBreakdown,
    period_start: periodStart,
    period_end: periodEnd
  }
}

/**
 * Calculate total income from transactions
 */
function calculateTotalIncome(transactions: ParsedTransaction[]): number {
  return transactions
    .filter(transaction => transaction.credit > 0)
    .reduce((sum, transaction) => sum + transaction.credit, 0)
}

/**
 * Calculate total expenses from transactions
 */
function calculateTotalExpenses(transactions: ParsedTransaction[]): number {
  return transactions
    .filter(transaction => transaction.debit > 0)
    .reduce((sum, transaction) => sum + transaction.debit, 0)
}

/**
 * Calculate number of months in the period
 */
function calculateMonthsInPeriod(startDate: string, endDate: string): number {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  const yearDiff = end.getFullYear() - start.getFullYear()
  const monthDiff = end.getMonth() - start.getMonth()
  
  return Math.max(1, yearDiff * 12 + monthDiff + 1) // At least 1 month
}

/**
 * Generate category breakdown with amounts and percentages
 */
function generateCategoryBreakdown(transactions: ParsedTransaction[]): CategoryBreakdown[] {
  const categoryTotals = new Map<TransactionCategory, number>()
  const categoryCounts = new Map<TransactionCategory, number>()

  // Calculate totals for each category
  transactions.forEach(transaction => {
    const amount = transaction.debit > 0 ? transaction.debit : transaction.credit
    const category = transaction.category

    categoryTotals.set(category, (categoryTotals.get(category) || 0) + amount)
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1)
  })

  // Calculate total amount for percentage calculation
  const totalAmount = Array.from(categoryTotals.values()).reduce((sum, amount) => sum + amount, 0)

  // Create breakdown array
  const breakdown: CategoryBreakdown[] = []
  
  categoryTotals.forEach((amount, category) => {
    const percentage = totalAmount > 0 ? (amount / totalAmount) * 100 : 0
    const transactionCount = categoryCounts.get(category) || 0

    breakdown.push({
      category,
      amount: Math.round(amount),
      percentage: Math.round(percentage * 100) / 100, // Round to 2 decimal places
      transaction_count: transactionCount
    })
  })

  // Sort by amount (descending)
  return breakdown.sort((a, b) => b.amount - a.amount)
}

/**
 * Get spending insights and recommendations
 */
export function getSpendingInsights(analysis: StatementAnalysis): {
  insights: string[]
  recommendations: string[]
} {
  const insights: string[] = []
  const recommendations: string[] = []

  // Income insights
  if (analysis.average_income > 0) {
    insights.push(`Your average monthly income is ₹${analysis.average_income.toLocaleString()}`)
  }

  // Expense insights
  if (analysis.average_expenses > 0) {
    insights.push(`Your average monthly expenses are ₹${analysis.average_expenses.toLocaleString()}`)
  }

  // Surplus insights
  if (analysis.monthly_surplus > 0) {
    insights.push(`You have a monthly surplus of ₹${analysis.monthly_surplus.toLocaleString()}`)
    recommendations.push('Consider investing your surplus in SIPs for long-term wealth creation')
  } else if (analysis.monthly_surplus < 0) {
    insights.push(`You have a monthly deficit of ₹${Math.abs(analysis.monthly_surplus).toLocaleString()}`)
    recommendations.push('Review your expenses and consider reducing non-essential spending')
  }

  // Category insights
  const topExpenseCategory = analysis.category_breakdown.find(cat => cat.category !== 'salary')
  if (topExpenseCategory) {
    insights.push(`Your highest expense category is ${formatCategoryName(topExpenseCategory.category)} (${topExpenseCategory.percentage}%)`)
  }

  // EMI/Loan insights
  const emiCategory = analysis.category_breakdown.find(cat => cat.category === 'emi_loans')
  if (emiCategory && emiCategory.percentage > 30) {
    recommendations.push('Your EMI/Loan payments are high. Consider refinancing or prepayment options')
  }

  // Food expense insights
  const foodCategory = analysis.category_breakdown.find(cat => cat.category === 'food')
  if (foodCategory && foodCategory.percentage > 20) {
    recommendations.push('Consider reducing food expenses by cooking at home more often')
  }

  // Shopping insights
  const shoppingCategory = analysis.category_breakdown.find(cat => cat.category === 'shopping')
  if (shoppingCategory && shoppingCategory.percentage > 15) {
    recommendations.push('Review your shopping expenses and prioritize needs over wants')
  }

  return { insights, recommendations }
}

/**
 * Format category name for display
 */
function formatCategoryName(category: TransactionCategory): string {
  const categoryNames: Record<TransactionCategory, string> = {
    salary: 'Salary/Income',
    emi_loans: 'EMI/Loans',
    food: 'Food & Dining',
    shopping: 'Shopping',
    utilities: 'Utilities',
    entertainment: 'Entertainment',
    healthcare: 'Healthcare',
    transport: 'Transport',
    investment: 'Investment',
    others: 'Others'
  }

  return categoryNames[category] || category
}

/**
 * Detect unusual spending patterns
 */
export function detectUnusualSpending(transactions: ParsedTransaction[]): {
  unusualTransactions: ParsedTransaction[]
  patterns: string[]
} {
  const unusualTransactions: ParsedTransaction[] = []
  const patterns: string[] = []

  // Calculate average transaction amounts by category
  const categoryAverages = new Map<TransactionCategory, number>()
  const categoryCounts = new Map<TransactionCategory, number>()

  transactions.forEach(transaction => {
    const amount = transaction.debit > 0 ? transaction.debit : transaction.credit
    const category = transaction.category

    categoryAverages.set(category, (categoryAverages.get(category) || 0) + amount)
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1)
  })

  // Calculate averages
  categoryAverages.forEach((total, category) => {
    const count = categoryCounts.get(category) || 1
    categoryAverages.set(category, total / count)
  })

  // Find unusual transactions (more than 3x average for category)
  transactions.forEach(transaction => {
    const amount = transaction.debit > 0 ? transaction.debit : transaction.credit
    const category = transaction.category
    const average = categoryAverages.get(category) || 0

    if (amount > average * 3 && amount > 1000) { // Only flag if amount > ₹1000
      unusualTransactions.push(transaction)
    }
  })

  // Detect patterns
  if (unusualTransactions.length > 0) {
    patterns.push(`Found ${unusualTransactions.length} unusually large transactions`)
  }

  // Check for frequent small transactions (potential impulse spending)
  const smallTransactions = transactions.filter(t => 
    (t.debit > 0 ? t.debit : t.credit) < 500 && 
    ['shopping', 'food', 'entertainment'].includes(t.category)
  )

  if (smallTransactions.length > 20) {
    patterns.push('High frequency of small transactions detected - consider budgeting for discretionary spending')
  }

  return { unusualTransactions, patterns }
}

/**
 * Generate monthly spending trend
 */
export function generateMonthlyTrend(transactions: ParsedTransaction[]): Array<{
  month: string
  income: number
  expenses: number
  surplus: number
}> {
  const monthlyData = new Map<string, { income: number; expenses: number }>()

  transactions.forEach(transaction => {
    const date = new Date(transaction.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    
    if (!monthlyData.has(monthKey)) {
      monthlyData.set(monthKey, { income: 0, expenses: 0 })
    }

    const data = monthlyData.get(monthKey)!
    if (transaction.credit > 0) {
      data.income += transaction.credit
    }
    if (transaction.debit > 0) {
      data.expenses += transaction.debit
    }
  })

  return Array.from(monthlyData.entries())
    .map(([month, data]) => ({
      month,
      income: Math.round(data.income),
      expenses: Math.round(data.expenses),
      surplus: Math.round(data.income - data.expenses)
    }))
    .sort((a, b) => a.month.localeCompare(b.month))
}
