import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';
import { LoanApplication } from '../models/loanapplication.model';
 import { HttpHeaders } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  public baseUrl="https://8080-fbdcdabdaeaacbadfbfdaaedceffaacaaae.premiumproject.examly.io/api";
  constructor(private http: HttpClient) {}
 
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
 
  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.baseUrl}/loan`, {
      headers: this.getAuthHeaders(),
    });
  }
 
  deleteLoan(loanId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/loan/${loanId}`, {
      headers: this.getAuthHeaders(),
    });
  }
 
  getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.baseUrl}/loan/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
 
  addLoan(requestObject: Loan): Observable<Loan> {
return this.http.post<Loan>(`${this.baseUrl}/loan`, requestObject, {
      headers: this.getAuthHeaders(),
    });
  }
 
  updateLoan(id: number, requestObject: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${this.baseUrl}/loan/${id}`, requestObject, {
      headers: this.getAuthHeaders(),
    });
  }
 
  getAppliedLoans(userId: number): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(
      `${this.baseUrl}/loan-application/user/${userId}`,
      { headers: this.getAuthHeaders() }
    );
  }
 
  deleteLoanApplication(loanId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/loan-application/${loanId}`,
      { headers: this.getAuthHeaders() }
    );
  }
 
  addLoanApplication(data: LoanApplication): Observable<LoanApplication> {
return this.http.post<LoanApplication>(
      `${this.baseUrl}/loan-application`,
      data,
      { headers: this.getAuthHeaders() }
    );
  }
 
  getAllLoanApplications(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(
      `${this.baseUrl}/loan-application`,
      { headers: this.getAuthHeaders() }
    );
  }
 
  updateLoanStatus(id: number, loanApplication: LoanApplication): Observable<LoanApplication> {
    return this.http.put<LoanApplication>(
      `${this.baseUrl}/loan-application/${id}`,
      loanApplication,
      { headers: this.getAuthHeaders() }
    );
  }
}
  


