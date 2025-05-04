
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';
import { LoanApplication } from '../models/loanapplication.model';


import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})


export class LoanService {
  private apiUrl = 'https://8080-ffbdddabdbdabbadfbfdaaedceffaacaaae.premiumproject.examly.io/api';


  constructor(private http: HttpClient, private authService: AuthService) {}

 

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getAllLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/loan`, { headers: this.getHeaders() });
  }

  deleteLoan(loanId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/loan/${loanId}`, { headers: this.getHeaders() });
  }

  getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/loan/${id}`, { headers: this.getHeaders() });
  }

  addLoan(requestObject: Loan): Observable<Loan> {
    return this.http.post<Loan>(`${this.apiUrl}/loan`, requestObject, { headers: this.getHeaders() });
  }

  updateLoan(id: number, requestObject: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/loan/${id}`, requestObject, { headers: this.getHeaders() });
  }

  getAppliedLoans(userId: number): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.apiUrl}/loan-application/user/${userId}`);
  }

  deleteLoanApplication(loanId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/loan-application/${loanId}`);
  }

  addLoanApplication(data: LoanApplication): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(`${this.apiUrl}/loan-application`, data);
  }

  getAllLoanApplications(): Observable<LoanApplication[]> {
    return this.http.get<LoanApplication[]>(`${this.apiUrl}/loan-application`);
  }

  updateLoanStatus(id: number, loanApplication: LoanApplication): Observable<LoanApplication> {
    return this.http.put<LoanApplication>(`${this.apiUrl}/loan-application/${id}`, loanApplication);
  }


  removeLoanReferences(loanId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/loan-application/remove-loan-references/${loanId}`, {}, { headers: this.getHeaders() });
  }
}

