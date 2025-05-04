
export interface LoanApplication
{
    loanApplicationId?: number;
    userId?:number;
    loanId?:number;
    submissionDate:string;
    loanStatus?:number;
    farmLocation:string;
    farmerAddress:string;
    farmSizeInAcres:number;
    farmPurpose:string;
    file:string;
    
    
}