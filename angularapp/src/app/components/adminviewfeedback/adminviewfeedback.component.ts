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

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (data) => {
        console.log('Loading feedbacks...');
        this.feedbacks = data;
        console.log(data);
        console.log();
        
        this.loadUsernames(); // Call after feedbacks are loaded
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
      this.feedbackService.getUsernameByUserId(feedback?.UserId).subscribe(
        username => {
          console.log(`Username for user ID ${feedback.UserId} is: ${feedback.user?.Username}`); // Log the username here
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
      console.log('Feedback Object:', feedback); // Debugging to ensure data exists
      const formattedDate = feedback.date ? new Date(feedback.date).toLocaleDateString() : 'Not Available';
      
  
      Swal.fire({
        title: 'User Profile',
        html: `
          <div style="text-align: center;">
          <p><strong>Feedback ID:</strong> ${feedback?.feedbackId ?? 'Not Available'}</p>
            <p ><strong>Username:</strong> ${feedback.user?.username ?? 'Unknown'}</p>
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
    console.log(`Username for user ID ${userId} is: ${this.feedbackUsernames[userId]}`); // Log the fetched username
    return this.feedbackUsernames[userId] || '...';
  }
}
