
// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { LoanService } from 'src/app/services/loan.service';
// import { Loan } from 'src/app/models/loan.model';

// @Component({
//   selector: 'app-createloan',
//   templateUrl: './createloan.component.html',
//   styleUrls: ['./createloan.component.css']
// })
// export class CreateloanComponent implements OnInit {
//   message: string = '';
//   showModal: boolean = false;

//   constructor(private loanService: LoanService) {}

//   ngOnInit(): void {}

//   onSubmit(form: NgForm) {
//     if (form.invalid) {
//       this.message = 'All fields are required';
//       return;
//     }

//     const newLoan: Loan = form.value;
//     console.log('New Loan to be added:', newLoan);

//     this.loanService.addLoan(newLoan).subscribe(
//       response => {
//         console.log('Loan added successfully:', response);
//         this.showModal = true;  // Show the modal
//         this.message = '';  // Clear the message
//         form.resetForm();
//       },
//       error => {
//         console.error('Error adding loan:', error);
//         if(error.error && error.error.message)
//         {
//           this.message = error.error.message;
//         }
//         else{
//           this.message = 'Error adding loan';
//         }
        
//       }
//     );
//   }

//   closeModal() {
//     this.showModal = false;  // Close the modal
//   }
// }
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';
import { Loan } from 'src/app/models/loan.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createloan',
  templateUrl: './createloan.component.html',
  styleUrls: ['./createloan.component.css']
})
export class CreateloanComponent implements OnInit {
  newLoan:Loan={
    LoanId:0,
    LoanType:'',
    Description:'',
    InterestRate:0,
    MaximumAmount:0,
    RepaymentTenure:0,
    Eligibility:'',
    DocumentsRequired:''
  }
  message: string = '';
  showModal: boolean = false;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid || !this.customValidation(form)) {
      // Set message to already set specific field error message
      return;
    }

    console.log('New Loan to be added:', this.newLoan);

    this.loanService.addLoan(this.newLoan).subscribe(
      response => {
        console.log('Loan added successfully:', response);
        this.showSuccessMessage('Loan added successfully'); // Show success message
        this.message = '';  // Clear the message
        form.resetForm();
      },
      error => {
        console.error('Error adding loan:', error);
        if (error.error && error.error.message) {
          this.message = error.error.message;
        } else {
          this.message = 'Error adding loan';
        }
        this.showErrorMessage(this.message);
      }
    );
  }

  customValidation(form: NgForm): boolean {
    const { loanType, description, interestRate, maximumAmount, repaymentTenure, eligibility, documentsRequired } = form.value;

    if (loanType && loanType.length > 30) {
      this.showErrorMessage('Loan Type must be less than 30 words');
      return false;
    }
    if (description && description.length > 100) {
      this.showErrorMessage('Description must be less than 100 words');
      return false;
    }
    if (interestRate && (interestRate > 20)) {
      this.showErrorMessage('Interest Rate must be less than 20');
      return false;
    }
    if (maximumAmount && (maximumAmount < 30000 || maximumAmount > 1500000)) {
      this.showErrorMessage('Maximum Amount must be greater than 30000 and less than 1500000');
      return false;
    }
    if (repaymentTenure && (repaymentTenure < 1 || repaymentTenure > 35)) {
      this.showErrorMessage('Repayment Tenure must be greater than 1 and less than 35');
      return false;
    }
    if (eligibility && eligibility.length > 50) {
      this.showErrorMessage('Eligibility must be less than 50 words');
      return false;
    }
    if (documentsRequired && documentsRequired.length > 50) {
      this.showErrorMessage('Documents Required must be less than 50 words');
      return false;
    }
    return true;
  }

  closeModal() {
    this.showModal = false;  // Close the modal
  }

  showErrorMessage(message: string): void {
    this.message = message;
    Swal.fire({
      title: 'Error!',
      text: message,
      confirmButtonText: 'OK'
    });
  }

  showSuccessMessage(message: string): void {
    this.message = message;
    Swal.fire({
      title: 'Success!',
      text: message,
      confirmButtonText: 'OK'
    });
  }
}



