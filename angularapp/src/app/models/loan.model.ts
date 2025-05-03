export interface Loan {
    loanId?: number;
    loanType: string;
    description: string;
    interestRate: number;
    maximumAmount: number;
    repaymentTenure: number;
    eligibility: string;
    documentsRequired: string;
  }
  