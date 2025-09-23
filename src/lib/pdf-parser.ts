import pdf from 'pdf-parse'
import { ParsedTransaction, TransactionCategory } from '@/types'

/**
 * Parse PDF bank statement and extract transaction data
 * @param buffer - PDF file buffer
 * @returns Array of parsed transactions
 */
export async function parseBankStatement(buffer: Buffer): Promise<ParsedTransaction[]> {
  try {
    const data = await pdf(buffer)
    const text = data.text
    
    // Split text into lines and filter out empty lines
    const lines = text.split('\n').filter(line => line.trim().length > 0)
    
    const transactions: ParsedTransaction[] = []
    
    // Common patterns for different bank statement formats
    const datePattern = /(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|\d{2,4}[-\/]\d{1,2}[-\/]\d{1,2})/
    const amountPattern = /(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      
      // Skip header lines and summary lines
      if (isHeaderLine(line) || isSummaryLine(line)) {
        continue
      }
      
      // Look for transaction lines
      const transaction = parseTransactionLine(line, lines, i)
      if (transaction) {
        transactions.push(transaction)
      }
    }
    
    return transactions
  } catch (error) {
    console.error('Error parsing PDF:', error)
    throw new Error('Failed to parse bank statement PDF')
  }
}

/**
 * Check if line is a header line (contains column names)
 */
function isHeaderLine(line: string): boolean {
  const headerKeywords = [
    'date', 'description', 'debit', 'credit', 'balance', 'particulars',
    'narration', 'ref no', 'transaction', 'amount', 'dr', 'cr'
  ]
  
  const lowerLine = line.toLowerCase()
  return headerKeywords.some(keyword => lowerLine.includes(keyword))
}

/**
 * Check if line is a summary line (contains totals)
 */
function isSummaryLine(line: string): boolean {
  const summaryKeywords = [
    'total', 'balance', 'opening', 'closing', 'summary', 'grand total'
  ]
  
  const lowerLine = line.toLowerCase()
  return summaryKeywords.some(keyword => lowerLine.includes(keyword))
}

/**
 * Parse a single transaction line
 */
function parseTransactionLine(
  line: string, 
  allLines: string[], 
  currentIndex: number
): ParsedTransaction | null {
  try {
    // Extract date
    const dateMatch = line.match(/(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}|\d{2,4}[-\/]\d{1,2}[-\/]\d{1,2})/)
    if (!dateMatch) return null
    
    const date = normalizeDate(dateMatch[1])
    
    // Extract amounts (look for multiple amounts in the line)
    const amounts = line.match(/(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/g)
    if (!amounts || amounts.length < 2) return null
    
    // Convert amounts to numbers
    const numericAmounts = amounts.map(amount => 
      parseFloat(amount.replace(/,/g, ''))
    )
    
    // Determine debit and credit based on position and context
    let debit = 0
    let credit = 0
    let balance = 0
    
    // Simple heuristic: usually debit is first, credit is second, balance is last
    if (numericAmounts.length >= 2) {
      // Check if this looks like a debit transaction
      const description = line.replace(dateMatch[0], '').replace(amounts.join(' '), '').trim()
      const isDebit = isDebitTransaction(description)
      
      if (isDebit) {
        debit = numericAmounts[0]
        balance = numericAmounts[numericAmounts.length - 1]
      } else {
        credit = numericAmounts[0]
        balance = numericAmounts[numericAmounts.length - 1]
      }
    }
    
    // Extract description (everything except date and amounts)
    const description = line
      .replace(dateMatch[0], '')
      .replace(amounts.join(' '), '')
      .trim()
    
    // Categorize transaction
    const category = categorizeTransaction(description)
    
    return {
      date,
      description,
      debit,
      credit,
      balance,
      category
    }
  } catch (error) {
    console.error('Error parsing transaction line:', error)
    return null
  }
}

/**
 * Normalize date format to YYYY-MM-DD
 */
function normalizeDate(dateStr: string): string {
  try {
    // Handle different date formats
    const formats = [
      /(\d{1,2})[-\/](\d{1,2})[-\/](\d{2,4})/,  // DD/MM/YYYY or DD-MM-YYYY
      /(\d{2,4})[-\/](\d{1,2})[-\/](\d{1,2})/   // YYYY/MM/DD or YYYY-MM-DD
    ]
    
    for (const format of formats) {
      const match = dateStr.match(format)
      if (match) {
        let day, month, year
        
        if (format.source.includes('\\d{2,4}')) {
          // YYYY/MM/DD format
          year = match[1]
          month = match[2]
          day = match[3]
        } else {
          // DD/MM/YYYY format
          day = match[1]
          month = match[2]
          year = match[3]
        }
        
        // Convert 2-digit year to 4-digit
        if (year.length === 2) {
          year = parseInt(year) > 50 ? `19${year}` : `20${year}`
        }
        
        // Pad with zeros
        day = day.padStart(2, '0')
        month = month.padStart(2, '0')
        
        return `${year}-${month}-${day}`
      }
    }
    
    return dateStr // Return original if no format matches
  } catch (error) {
    return dateStr
  }
}

/**
 * Determine if transaction is a debit (expense)
 */
function isDebitTransaction(description: string): boolean {
  const debitKeywords = [
    'debit', 'dr', 'withdrawal', 'payment', 'transfer', 'purchase',
    'atm', 'pos', 'online', 'upi', 'neft', 'imps', 'rtgs'
  ]
  
  const lowerDesc = description.toLowerCase()
  return debitKeywords.some(keyword => lowerDesc.includes(keyword))
}

/**
 * Categorize transaction based on description
 */
function categorizeTransaction(description: string): TransactionCategory {
  const lowerDesc = description.toLowerCase()
  
  // Salary/Income
  if (lowerDesc.includes('salary') || lowerDesc.includes('credit') || 
      lowerDesc.includes('deposit') || lowerDesc.includes('refund')) {
    return 'salary'
  }
  
  // EMI/Loans
  if (lowerDesc.includes('emi') || lowerDesc.includes('loan') || 
      lowerDesc.includes('installment') || lowerDesc.includes('repayment')) {
    return 'emi_loans'
  }
  
  // Food
  if (lowerDesc.includes('restaurant') || lowerDesc.includes('food') || 
      lowerDesc.includes('swiggy') || lowerDesc.includes('zomato') ||
      lowerDesc.includes('cafe') || lowerDesc.includes('dining')) {
    return 'food'
  }
  
  // Shopping
  if (lowerDesc.includes('amazon') || lowerDesc.includes('flipkart') || 
      lowerDesc.includes('myntra') || lowerDesc.includes('shopping') ||
      lowerDesc.includes('mall') || lowerDesc.includes('store')) {
    return 'shopping'
  }
  
  // Utilities
  if (lowerDesc.includes('electricity') || lowerDesc.includes('water') || 
      lowerDesc.includes('gas') || lowerDesc.includes('internet') ||
      lowerDesc.includes('mobile') || lowerDesc.includes('broadband')) {
    return 'utilities'
  }
  
  // Entertainment
  if (lowerDesc.includes('movie') || lowerDesc.includes('netflix') || 
      lowerDesc.includes('spotify') || lowerDesc.includes('entertainment') ||
      lowerDesc.includes('game') || lowerDesc.includes('subscription')) {
    return 'entertainment'
  }
  
  // Healthcare
  if (lowerDesc.includes('hospital') || lowerDesc.includes('medical') || 
      lowerDesc.includes('pharmacy') || lowerDesc.includes('doctor') ||
      lowerDesc.includes('health') || lowerDesc.includes('clinic')) {
    return 'healthcare'
  }
  
  // Transport
  if (lowerDesc.includes('uber') || lowerDesc.includes('ola') || 
      lowerDesc.includes('metro') || lowerDesc.includes('bus') ||
      lowerDesc.includes('fuel') || lowerDesc.includes('petrol') ||
      lowerDesc.includes('diesel') || lowerDesc.includes('taxi')) {
    return 'transport'
  }
  
  // Investment
  if (lowerDesc.includes('investment') || lowerDesc.includes('mutual') || 
      lowerDesc.includes('sip') || lowerDesc.includes('equity') ||
      lowerDesc.includes('fund') || lowerDesc.includes('portfolio')) {
    return 'investment'
  }
  
  return 'others'
}

/**
 * Sample test case for parsing
 */
export const sampleBankStatement = `
Date        Description                    Debit      Credit     Balance
01/01/2024  SALARY CREDIT                  0.00      50000.00   50000.00
02/01/2024  ATM WITHDRAWAL                 2000.00   0.00        48000.00
03/01/2024  UPI PAYMENT - SWIGGY           350.00    0.00        47650.00
04/01/2024  EMI - HOME LOAN                15000.00  0.00        32650.00
05/01/2024  ELECTRICITY BILL               1200.00   0.00        31450.00
06/01/2024  AMAZON PURCHASE                2500.00   0.00        28950.00
07/01/2024  UBER RIDE                      180.00    0.00        28770.00
08/01/2024  NETFLIX SUBSCRIPTION           199.00    0.00        28571.00
09/01/2024  MEDICAL BILL                   800.00    0.00        27771.00
10/01/2024  SIP - MUTUAL FUND              5000.00   0.00        22771.00
`
