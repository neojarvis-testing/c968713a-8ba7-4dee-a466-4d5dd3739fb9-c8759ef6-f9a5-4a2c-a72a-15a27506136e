import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
feedbackText:string='';
  constructor() { }
submitFeedback(){
  if(this.feedbackText.trim())
  {
    console.log('Feedback submitted:', this.feedbackText);
    alert('Thank you for your feedback!');
    this.feedbackText='';
  }
  else{
    console.log('Feedback is required.');
  }
}

  ngOnInit(): void {
  }

}
