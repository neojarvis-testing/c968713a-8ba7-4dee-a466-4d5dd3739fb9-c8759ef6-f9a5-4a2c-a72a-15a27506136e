
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



  constructor() {}

  ngOnInit(): void {
   
  }

 
 
}

