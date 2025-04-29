import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model'; // Update import path
 
@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private baseUrl = 'https://8080-afbccbebadfbfdaaedceffaacaaae.premiumproject.examly.io/api';
 
  constructor(private http: HttpClient) {}
 
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
 
  sendFeedback(feedback: Feedback): Observable<Feedback> {
return this.http.post<Feedback>(`${this.baseUrl}/feedback`, feedback, {
      headers: this.getAuthHeaders(),
    });
  }
 
  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(
      `${this.baseUrl}/feedback/user/${userId}`,
      { headers: this.getAuthHeaders() }
    );
  }
 
  deleteFeedback(feedbackId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/feedback/${feedbackId}`, {
      headers: this.getAuthHeaders(),
    });
  }
 
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedback`, {
      headers: this.getAuthHeaders(),
    });
  }
}