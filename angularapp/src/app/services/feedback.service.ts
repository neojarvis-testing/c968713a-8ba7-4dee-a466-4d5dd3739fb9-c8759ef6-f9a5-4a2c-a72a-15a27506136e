import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Feedback } from '../models/feedback.model';
import { AuthService } from './auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
 
  private apiUrl = 'https://8080-ffbdddabdbdabbadfbfdaaedceffaacaaae.premiumproject.examly.io/api';
 
  constructor(private http: HttpClient, private authService: AuthService) {}
 
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }
 
  sendFeedback(feedback: Feedback): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/feedback`, feedback, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
 
  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedback/user/${userId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
 
  getUsernameByUserId(userId: number): Observable<string> {
    return this.http.get<{ username: string }>(`${this.apiUrl}/feedback/username/${userId}`, { headers: this.getHeaders() }).pipe(
      map(response => {
        console.log(`Full response for userId ${userId}: `, response); // Log the full response here
        return response.username; // Use the correct lowercase key
      }),
      catchError(error => {
        // Enhanced logging for the error
        console.error('Fetch username error:', {
          status: error.status, // HTTP status code
          message: error.message, // Error message
          error: error.error // Full error response
        });
        return throwError(error);
      })
    );
  }
 
 
 
 
  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/feedback/${feedbackId}`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
 
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/feedback`, { headers: this.getHeaders() }).pipe(
      catchError(this.handleError)
    );
  }
 
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}