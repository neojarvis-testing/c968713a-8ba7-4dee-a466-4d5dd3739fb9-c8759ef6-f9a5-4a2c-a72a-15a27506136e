import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-createloan',
  templateUrl: './createloan.component.html',
  styleUrls: ['./createloan.component.css']
})
export class CreateLoanComponent {
  loanDetails: Loan = {
    LoanType: '',
    Description: '',
    InterestRate: 0,
    MaximunAmount: 0,
    RepaymentTenure: 0,
    Eligibility: '',
    DocumentsRequired: ''
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private loanService: LoanService) {}

  AddLoan(form:any) {
    if (form.valid) {
      this.loanService.addLoan(this.loanDetails).subscribe(
        response => {
          this.successMessage = 'Successfully Added!';
          this.errorMessage = null;
          console.log('Loan Details:', response);
          // Reset the form
          form.resetForm();
          // Reset loanDetails to initial state
          this.loanDetails = {
            LoanType: '',
            Description: '',
            InterestRate: 0,
            MaximunAmount: 0,
            RepaymentTenure: 0,
            Eligibility: '',
            DocumentsRequired: ''
          };
        },
        error => {
          if (error.status === 409) {
            this.errorMessage = 'Loan with the same type already exists';
          } else {
            this.errorMessage = 'An error occurred. Please try again.';
          }
          this.successMessage = null;
          console.error('Error:', error);
        }
      );
    } else {
      this.errorMessage = 'All fields are required.';
      this.successMessage = null;
      console.log('All fields are required.');
    }
  }
}
