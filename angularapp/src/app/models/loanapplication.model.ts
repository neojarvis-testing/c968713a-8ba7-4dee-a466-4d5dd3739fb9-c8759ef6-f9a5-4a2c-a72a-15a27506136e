export interface LoanApplication
{
    LoanApplicationId?: number;
    UserId?:number;
    loanId?:number;
    SubmissionDate:string;
    LoanStatus:number;
    FarmLocation:string;
    FarmAddress:string;
    FarmSizeInAcres:number;
    FarmPurpose:string;
    File:string;
}