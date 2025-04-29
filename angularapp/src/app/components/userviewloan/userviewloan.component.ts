import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loan } from 'src/app/models/loan.model';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { LoanService } from 'src/app/services/loan.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userviewloan',
  templateUrl: './userviewloan.component.html',
  styleUrls: ['./userviewloan.component.css']
})
export class UserviewloanComponent implements OnInit {

  loans: Loan[] = [];
  filteredLoans: Loan[] = this.loans;
  userId: number;
  appliedLoanIds: number[] = []; // Array to store IDs of applied loans

  constructor(private loanService: LoanService, private authService: AuthService, private router: Router) { 
    this.userId = Number(localStorage.getItem('userId')); // Get userId from local storage
  }

  ngOnInit(): void {
    this.fetchLoans();
  }

  fetchLoans(): void {
    this.loanService.getAllLoans().subscribe(
      (loans: Loan[]) => {
        console.log('Fetched loans:', loans); // Log fetched loans

        this.loans = loans;
        this.checkAppliedLoans(); // Check which loans have been applied for
        this.filteredLoans = this.loans; // Initialize filtered loans to show all loans initially
      },
      error => {
        console.error('Error fetching loan data:', error);
      }
    );
  }

  checkAppliedLoans(): void {
    this.loanService.getAppliedLoans(this.userId).subscribe(
      (appliedLoans: LoanApplication[]) => {
        this.appliedLoanIds = appliedLoans.map(app => app.LoanId);
      },
      error => {
        console.error('Error fetching applied loans:', error);
      }
    );
  }

  isLoanApplied(LoanId: number): boolean {
    return this.appliedLoanIds.includes(LoanId);
  }

  searchByLoanName(searchtxt: string): void {
    this.filteredLoans = this.loans.filter(loan =>
      loan.LoanType.toLowerCase().includes(searchtxt.toLowerCase())
    );
  }

  applyForLoan(loan: Loan): void {
    this.router.navigate(['/loanform', loan.LoanId]);
  }
}
