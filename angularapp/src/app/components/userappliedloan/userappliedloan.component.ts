
import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/services/loan.service';
import { LoanApplication } from 'src/app/models/loanapplication.model';
import { Loan } from 'src/app/models/loan.model';

@Component({
  selector: 'app-userviewloan',
  templateUrl: './userappliedloan.component.html',
  styleUrls: ['./userappliedloan.component.css']
})
export class UserappliedloanComponent implements OnInit {
  loanApplications: LoanApplication[] = [];
  filteredLoans: LoanApplication[] = [];
  loanDetails: { [key: number]: Loan } = {}; // Store loan details with Loan ID as the key
  showConfirmationPopup: boolean = false;
  loanToDelete: LoanApplication | null = null;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.fetchLoanApplications();
  }

  fetchLoanApplications(): void {
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
    if (userId) {
      this.loanService.getAppliedLoans(Number(userId)).subscribe({
        next: (loanApplications: LoanApplication[]) => {
          this.loanApplications = loanApplications;
          this.filteredLoans = loanApplications;
          this.fetchLoanDetails();
        },
        error: (error) => {
          console.error('Error fetching loan applications:', error);
        }
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }

  fetchLoanDetails(): void {
    this.loanApplications.forEach(loanApp => {
      if (loanApp.LoanId) {
        this.loanService.getLoanById(loanApp.LoanId).subscribe({
          next: (loan: Loan) => {
            this.loanDetails[loanApp.LoanId] = loan;
          },
          error: (error) => {
            console.error(`Error fetching loan with ID ${loanApp.LoanId}:`, error);
          }
        });
      }
    });
  }

  searchByLoanName(searchtxt: string): void {
    this.filteredLoans = this.loanApplications.filter(loan =>
      this.loanDetails[loan.LoanId]?.loanType.toLowerCase().includes(searchtxt.toLowerCase())
    );
  }

  confirmDelete(loan: LoanApplication): void {
    if (loan.LoanStatus === 1) {
      console.error('Cannot delete an approved loan.');
      return;
    }
    this.loanToDelete = loan;
    this.showConfirmationPopup = true;
  }

  deleteLoan(): void {
    if (this.loanToDelete) {
      this.loanService.deleteLoan(this.loanToDelete.LoanId!).subscribe({
        next: () => {
          this.loanApplications = this.loanApplications.filter(loan => loan !== this.loanToDelete);
          this.filteredLoans = this.loanApplications; // Update the filtered loans as well
          this.cancelDelete();
        },
        error: (error) => {
          console.error('Error deleting loan:', error);
        }
      });
    }
  }

  cancelDelete(): void {
    this.loanToDelete = null;
    this.showConfirmationPopup = false;
  }
}

