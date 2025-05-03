import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // Ensure the correct path to the AuthService
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service'; // Ensure the correct path to the FeedbackService
 
@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {

 

  isAdmin: boolean = true; // Set to true if the user is an admin
  username: string = ''; // Placeholder for the actual username
  role: string = this.isAdmin ? 'Admin' : 'User';
  userId: number; // Ensure you have userId

 
  constructor(private authService: AuthService, private router: Router, private feedbackService: FeedbackService) {}
 
    ngOnInit(): void {
    this.userId = parseInt(localStorage.getItem('userId')!, 10); 
    this.getUsername();
  }


  getUsername(): void {
    this.feedbackService.getUsernameByUserId(this.userId).subscribe({
      next: (username) => {
        this.username = username;
      },
      error: (error) => {
        console.error('Error fetching username:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  

 

  // Add dropdown toggle functionality
  toggleDropdown(event: Event): void {
    event.preventDefault();
    const dropdown = (event.currentTarget as HTMLElement).closest('.dropdown');
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
  }
}