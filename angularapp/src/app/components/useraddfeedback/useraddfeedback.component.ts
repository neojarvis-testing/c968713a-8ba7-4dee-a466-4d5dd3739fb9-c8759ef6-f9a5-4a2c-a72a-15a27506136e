import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {
  newfeedback:Feedback={
    FeedbackId:0,
    FeedbackText:'',
    UserId:0,
    Date:new Date()
  }

  FeedbackText:string='';
  showSuccessModal:boolean=false;
    constructor(private service:FeedbackService,private route:Router) { }

  submitFeedback(){
    this.service.sendFeedback(this.newfeedback).subscribe(res=>{
      console.log('Feedback successfully added.');
    });
    if(this.FeedbackText.trim())
    {
      this.showSuccessModal=true;
      console.log('Feedback submitted:', this.FeedbackText);
      this.FeedbackText='';
    }
    else{
      console.log('Feedback is required.');
    }
  }
  closeModal()
  {
    this.showSuccessModal=false;
  }

  ngOnInit(): void {
  }

}
