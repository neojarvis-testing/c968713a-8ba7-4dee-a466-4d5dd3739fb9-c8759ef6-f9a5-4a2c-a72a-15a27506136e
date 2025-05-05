import { LoanApplication } from "./loanapplication.model";

export interface Loan{
    loanId?:number;
    loanType:string;
    description:string;
    interestRate:number;
    maximumAmount:number;
    repaymentTenure:number;
    eligibility:string;
    documentsRequired:string;
    loanapplication:LoanApplication;
}
