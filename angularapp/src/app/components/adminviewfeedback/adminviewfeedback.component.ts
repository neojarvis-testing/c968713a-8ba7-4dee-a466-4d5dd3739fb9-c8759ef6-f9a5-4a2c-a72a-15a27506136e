import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  feedbackUsernames: { [key: number]: string } = {}; // Stores usernames mapped by user IDs
  selectedFeedback: Feedback | null = null;
  showProfileModal: boolean = false;
  errorMessage: string = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (data) => {
        console.log('Loading feedbacks...');
        this.feedbacks = data;
        this.loadUsernames();
        console.log(this.feedbacks);

        if (this.feedbacks.length === 0) {
          this.errorMessage = 'No data found';
        }
      },
      (error) => {
        console.error('Error fetching feedbacks:', error);
        this.errorMessage = 'Failed to load feedbacks.';
      }
    );
  }

  loadUsernames(): void {
    console.log('Loading usernames...');
    this.feedbacks.forEach(feedback => {
      this.feedbackService.getAllFeedbacksByUserId(feedback.UserId).subscribe(
        feedbacks => {
          if (feedbacks.length > 0) {
            this.feedbackUsernames[feedback.UserId] = feedbacks[0].UserId.toString(); // Keeping UserId, converting to string
          } else {
            this.feedbackUsernames[feedback.UserId] = 'Unknown'; // Default if no data found
          }
          console.log(`UserId for user ID ${feedback.UserId}: ${this.feedbackUsernames[feedback.UserId]}`);
        },
        error => {
          console.error(`Error fetching UserId for user ID ${feedback.UserId}:`, error);
          this.feedbackUsernames[feedback.UserId] = 'Unknown';
        }
      );
    });
  }

  showMore(feedback: Feedback): void {
    this.selectedFeedback = feedback;
    this.showProfileModal = true;
  }

  closeModal(): void {
    this.showProfileModal = false;
    this.selectedFeedback = null;
  }

  getUsername(userId: number): string {
    console.log(`Fetching username for user ID ${userId}: ${this.feedbackUsernames[userId]}`);
    return this.feedbackUsernames[userId] || '...'; // Defaults to '...' if username is not available
  }
}