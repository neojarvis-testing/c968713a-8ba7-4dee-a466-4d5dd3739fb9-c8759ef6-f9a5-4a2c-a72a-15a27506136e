import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoanService {

  public apiUrl="https://8080-ffbdddabdbdabbadfbfdaaedceffaacaaae.premiumproject.examly.io";
  constructor(private httpcleint:HttpClient) { }
   
  getAllLoans():Observable<Loan[]>
  {
    return this.httpcleint.get<Loan[]>(`${this.apiUrl}/api/loan`);
  }
  deleteLoan(loanId:number):Observable<void>
  {
    return this.httpcleint.delete<void>(`${this.apiUrl}/api/loan/${loanId}`);
  }
  getLoanById(id:number):Observable<Loan>
  {
 return this.httpcleint.get<Loan>(`${this.apiUrl}/api/loan/${id}`);
  }
  addLoan(requestObject:Loan):Observable<Loan>
  {
    return this.httpcleint.post<Loan>(`${this.apiUrl}/api/loan`,requestObject);
  }
  
  

}
