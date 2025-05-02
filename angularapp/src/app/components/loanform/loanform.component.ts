


import { Component, Injectable, OnInit } from '@angular/core';
 // Import ActivatedRoute for fetching URL parameters
import { LoanService } from 'src/app/services/loan.service';
import { LoanApplication } from 'src/app/models/loanapplication.model';

import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn:'root'
})
 
@Component({
  selector: 'app-loanform',
  templateUrl: './loanform.component.html',
  styleUrls: ['./loanform.component.css'],
 
})
export class LoanformComponent implements OnInit {
  loanData: LoanApplication = {
    LoanApplicationId: 0,
    UserId: 0, // Initialize as 0
    LoanId: 0, // Initialize as 0
    SubmissionDate: '', // Initialize as empty string
    LoanStatus: 0,
    FarmLocation: '',
    FarmAddress: '',
    FarmSizeInAcres: 0,
    FarmPurpose: '',
    File: ''
  };
 
  showSuccessPopup = false;
  errorMessage: string = '';
 
  constructor(
    private loanService: LoanService,
     private route: ActivatedRoute,  // Explicit injection
      private router: Router,
   
 ) { }
  
  ngOnInit(): void {
    // Get loanId from URL
    this.route.params.subscribe(params => {
      this.loanData.LoanId = +params['loanId']; // Convert string to number
    });
 
    // Get userId from local storage
    this.loanData.UserId = Number(localStorage.getItem('userId'));
 
    // Set the submissionDate dynamically with UTC time
    const now = new Date();
    this.loanData.SubmissionDate = now.toISOString(); // This will format as '2024-12-04T10:58:57.559Z'
  }
 
  onSubmit(): void {
    if (!this.loanData.FarmLocation || !this.loanData.FarmAddress || !this.loanData.FarmSizeInAcres || !this.loanData.FarmPurpose) {
      return;
    }
 
    // Log the loanData before making the HTTP request
    console.log('Loan Data:', this.loanData);
 
    this.loanService.addLoanApplication(this.loanData).subscribe(response => {
      console.log('Loan application submitted successfully');
      this.showSuccessPopup = true;
      this.errorMessage = '';
    }, error => {
      console.error('Submission failed', error);
      this.errorMessage = error.error.message || 'Failed to submit the loan application. Please try again.';
    });
  }
 
  closePopup(): void {
    this.showSuccessPopup = false;
    this.router.navigate(['/userviewloan']); // Navigate to userviewloan component
  }
 
  goBack(): void {
    this.router.navigate(['/userviewloan']);
  }
}

