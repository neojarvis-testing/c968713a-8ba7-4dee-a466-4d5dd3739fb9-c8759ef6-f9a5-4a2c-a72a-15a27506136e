import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user.model'; // Update import paths as necessary
import { Login } from '../models/login.model'; 
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://8080-ceeabaaafcbadfbfdaaedceffaacaaae.premiumproject.examly.io/api';
 
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  private userIdSubject = new BehaviorSubject<number | null>(null);
 
  userRole$ = this.userRoleSubject.asObservable();
  userId$ = this.userIdSubject.asObservable();
 
  constructor(private http: HttpClient) {}
 
  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
 
  login(login: Login): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, login).pipe(
      tap((response: any) => {
        console.log('API Response:', response); // Debugging log
  
        // Token storage
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
  
        // Role storage
        const role = response.role ; // Fallback role
        localStorage.setItem('userRole', role);
        this.userRoleSubject.next(role);
  
        // ID storage
        // if (response.id != null) {
        //   localStorage.setItem('userId', response.id.toString());
        //   this.userIdSubject.next(response.id);
        // } else {
        //   console.warn('ID is missing from the response.');
        // }
      })
    );
  }
 
  logout(): void {
    localStorage.clear();
    this.userRoleSubject.next(null);
    this.userIdSubject.next(null);
  }
 
  getToken(): string | null {
    return localStorage.getItem('token');
  }
 
  getCurrentUserRole(): string {
    return localStorage.getItem('userRole');
  }
 
  getCurrentUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? +id : null;
  }
}


 