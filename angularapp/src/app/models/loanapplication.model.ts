export interface LoanApplication
{
    LoanApplicationId?: number;
    UserId?:number;
    LoanId?:number;
    SubmissionDate:string;
    LoanStatus:number;
    FarmLocation:string;
    FarmAddress:string;
    FarmSizeInAcres:number;
    FarmPurpose:string;
    File:string;
}