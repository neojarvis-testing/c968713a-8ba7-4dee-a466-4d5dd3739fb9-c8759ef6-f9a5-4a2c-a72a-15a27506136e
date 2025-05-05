import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  feedbackUsernames: { [key: number]: string } = {};
  selectedFeedback: Feedback | null = null;
  showProfileModal: boolean = false;
  errorMessage: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  paginatedFeedbacks: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (data) => {
        this.feedbacks = data;
        this.totalPages = Math.ceil(this.feedbacks.length / this.itemsPerPage);
        this.updatePaginatedFeedbacks();
        this.loadUsernames();
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
        this.errorMessage = 'Failed to load feedbacks.';
      }
    );
  }

  updatePaginatedFeedbacks(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedFeedbacks = this.feedbacks.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedFeedbacks();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedFeedbacks();
    }
  }

  loadUsernames(): void {
    this.feedbacks.forEach(feedback => {
      this.feedbackService.getUsernameByUserId(feedback?.UserId).subscribe(
        username => {
          this.feedbackUsernames[feedback.UserId] = username;
        },
        error => {
          console.error('Error fetching username:', error);
          this.feedbackUsernames[feedback.UserId] = 'Unknown';
        }
      );
    });
  }

  showMore(feedback: any): void {
    if (feedback) {
      const formattedDate = feedback.date ? new Date(feedback.date).toLocaleDateString() : 'Not Available';

      Swal.fire({
        title: 'User Profile',
        html: `
          <div style="text-align: center;">
            <p><strong>Feedback ID:</strong> ${feedback?.feedbackId ?? 'Not Available'}</p>
            <p><strong>Username:</strong> ${feedback.user?.username ?? 'Unknown'}</p>
            <p><strong>Email:</strong> ${feedback.user?.email}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
          </div>
        `,
        icon: 'success',
        confirmButtonText: 'Close Profile'
      });

      this.selectedFeedback = feedback;
      this.showProfileModal = true;
    }
  }

  closeModal(): void {
    this.showProfileModal = false;
    this.selectedFeedback = null;
  }

  getUsername(userId: number): string {
    return this.feedbackUsernames[userId] || '...';
  }
}