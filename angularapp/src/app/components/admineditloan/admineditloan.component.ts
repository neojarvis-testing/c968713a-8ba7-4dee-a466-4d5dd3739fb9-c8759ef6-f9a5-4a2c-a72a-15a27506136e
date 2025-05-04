
import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/app/models/loan.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-admineditloan',
  templateUrl: './admineditloan.component.html',
  styleUrls: ['./admineditloan.component.css']
})
export class AdmineditloanComponent implements OnInit {
  

  loan: Loan = {
    
    loanType: '',
    description: '',
    interestRate: 0,
    maximumAmount: 0,
    repaymentTenure: 0,
    eligibility: '',
    documentsRequired: ''
  };
  message: string = '';
  showModal: boolean = false;
  loanId: number;

  constructor(private route: ActivatedRoute, private router: Router, private service: LoanService) { }

  ngOnInit(): void {
    // Fetch the loan data based on the ID from the route parameters
    this.loanId = +this.route.snapshot.paramMap.get('id');
    this.getLoanById();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.message = 'All fields are required';
      return;
    }

    this.service.updateLoan(this.loanId, this.loan).subscribe(
      response => {
        console.log('Loan updated successfully:', response);
        this.showModal = true;
        this.message = '';  // Clear the message
      },
      error => {
        console.error('Error updating loan:', error);
        if (error.error && error.error.message) {
          this.message = error.error.message;  // Display the error message from the backend
        } else {
          this.message = 'Error updating loan';
        }
      }
    );
  }

  getLoanById() {
    this.service.getLoanById(this.loanId).subscribe(
      res => {
        this.loan = res;
      },
      error => {
        console.error('Error fetching loan data:', error);
      }
    );
  }

  closeModal() {
    this.showModal = false;
    this.router.navigate(['/viewloan']);  // Navigate to the viewloan component
  }

  goBack() {
    this.router.navigate(['/viewloan']);  // Navigate to the viewloan component
  }
}








// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NgForm } from '@angular/forms';

// interface Loan {
//   loanType: string;
//   description: string;
//   interestRate: number;
//   maximumAmount: number;
//   repaymentTenure: number;
//   eligibility: string;
//   documentsRequired: string;
// }

// @Component({
//   selector: 'app-admineditloan',
//   templateUrl: './admineditloan.component.html',
//   styleUrls: ['./admineditloan.component.css']
// })
// export class AdminEditLoanComponent implements OnInit {
//   loan: Loan = {
//     loanType: '',
//     description: '',
//     interestRate: 0,
//     maximumAmount: 0,
//     repaymentTenure: 0,
//     eligibility: '',
//     documentsRequired: ''
//   };
//   message: string = '';
//   showModal: boolean = false;

//   constructor(private route: ActivatedRoute, private router: Router) { }

//   ngOnInit(): void {
//     // Fetch the loan data based on the ID from the route parameters
//     const loanId = this.route.snapshot.paramMap.get('id');
//     // Simulate fetching loan data
//     this.loan = {
//       loanType: 'Home Loan',
//       description: 'Loan for purchasing a new home.',
//       interestRate: 3.2,
//       maximumAmount: 10000000,
//       repaymentTenure: 360,
//       eligibility: '21 years and above',
//       documentsRequired: 'ID proof, Address proof, Income proof'
//     };
//   }

//   onSubmit(form: NgForm) {
//     if (form.invalid) {
//       this.message = 'All fields are required';
//       return;
//     }

//     // Simulate a successful update operation
//     this.showModal = true;
//     this.message = ''; // Clear the message
//   }

//   closeModal() {
//     this.showModal = false;
//     this.router.navigate(['/viewloan']); // Navigate to the viewloan component
//   }

//   goBack() {
//     this.router.navigate(['/viewloan']); // Navigate to the viewloan component
//   }
// }


