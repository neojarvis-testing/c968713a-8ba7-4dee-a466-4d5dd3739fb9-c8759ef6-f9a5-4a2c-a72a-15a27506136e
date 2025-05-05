import { Component, OnInit } from '@angular/core';
import { Loan } from 'src/app/models/loan.model';
import { LoanService } from 'src/app/services/loan.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-viewloan',
  templateUrl: './viewloan.component.html',
  styleUrls: ['./viewloan.component.css']
})
export class ViewloanComponent implements OnInit {
  loans: Loan[] = [];
  filteredLoans: Loan[] = [];
  paginatedLoans: Loan[] = [];
  searchTerm: string = '';
  showDeleteModal: boolean = false;
  loanToDelete: Loan | null = null;
  message: string = '';
 
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
 
  constructor(private loanService: LoanService, private router: Router) { }
 
  ngOnInit(): void {
    this.fetchLoans();
  }
 
  fetchLoans(): void {
    this.loanService.getAllLoans().subscribe(
      (loans: Loan[]) => {
        this.loans = loans;
        this.filteredLoans = loans;
        this.totalPages = Math.ceil(this.filteredLoans.length / this.itemsPerPage);
        this.updatePaginatedLoans();
      },
      error => {
        console.error('Error fetching loan data:', error);
      }
    );
  }
 
  searchLoans(): void {
    this.filteredLoans = this.loans.filter(loan =>
      loan.loanType.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      loan.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredLoans.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to first page on new search
    this.updatePaginatedLoans();
  }
  updatePaginatedLoans(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedLoans = this.filteredLoans.slice(startIndex, endIndex);
  }
 
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedLoans();
    }
  }
 
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedLoans();
    }
  }
 
  editLoan(loanId: number): void {
    if (loanId) {
      this.router.navigate(['/admineditloan', loanId]);
    } else {
      console.error('Loan ID is undefined');
    }
  }
 
  confirmDelete(loan: Loan): void {
    this.loanToDelete = loan;
    this.showDeleteModal = true;
  }
 
  deleteLoan(): void {
    if (this.loanToDelete) {
      this.loanService.deleteLoan(this.loanToDelete.loanId!).subscribe(
        () => {
          this.loans = this.loans.filter(l => l.loanId !== this.loanToDelete!.loanId);
          this.filteredLoans = this.loans;
          this.totalPages = Math.ceil(this.filteredLoans.length / this.itemsPerPage);
          this.updatePaginatedLoans();
          this.closeDeleteModal();
          this.showSuccessMessage('Loan deleted successfully');
        },
        error => {
          console.error('Error deleting loan:', error);
          this.showErrorMessage(error.error.message || 'Error deleting loan');
          this.closeDeleteModal();
        }
      );
    }
  }
 
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.loanToDelete = null;
  }
 
  showSuccessMessage(message: string): void {
    Swal.fire({
      title: 'Success!',
      text: message,
      confirmButtonText: 'OK'
    });
  }
 
  showErrorMessage(message: string): void {
    Swal.fire({
      title: 'Error!',
      text: message,
      confirmButtonText: 'OK'
    });
  }
}