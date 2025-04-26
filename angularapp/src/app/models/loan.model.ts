export interface Loan{
    LoanId?:number;
    LoanType:string;
    Description:string;
    InterestRate:number;
    MaximunAmount:number;
    RepaymentTenure:number;
    Eligibility:string;
    DocumentsRequired:string;
}