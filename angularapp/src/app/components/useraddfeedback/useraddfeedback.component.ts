import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  constructor(private feedbackService: FeedbackService, private router: Router) {}
  ngOnInit(): void {}

  isSubmitted: boolean = false;
  feedback: Feedback = {
    
    UserId: 0,
    FeedbackText: '',
    Date: undefined
  };

  
  onSubmit() {
   
    if (this.feedback) {
      this.feedback.UserId = parseInt(localStorage.getItem('userId'), 10);
      this.feedback.Date = new Date();
      console.log('Submitting feedback:', this.feedback);
      this.feedbackService.sendFeedback(this.feedback).subscribe((res) => {
        console.log(res);
        this.isSubmitted = true; // Ensure this line is present
        console.log("Added successfully");
        

        // Show SweetAlert2 success message
        Swal.fire({
          title: 'Feedback Submitted',
          text: 'Your feedback has been successfully submitted!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/userviewfeedback']);
        });
      });
    } else {
      console.log('Please enter your feedback');
    }
  }

  closePopup() {
    this.isSubmitted = false;
  }
}