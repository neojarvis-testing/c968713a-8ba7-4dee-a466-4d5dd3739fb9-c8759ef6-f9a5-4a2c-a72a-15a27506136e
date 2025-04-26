import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user.model'; // Update import paths as necessary
import { Login } from '../models/login.model'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://8080-ffbdddabdbdabbadfbfdaaedceffaacaaae.premiumproject.examly.io/api';
 
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
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userRole', response.role);
          localStorage.setItem('userId', response.id.toString());
          this.userRoleSubject.next(response.role);
          this.userIdSubject.next(response.id);
        }
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
 
  getCurrentUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
 
  getCurrentUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? +id : null;
  }
}

function tap(arg0: (response: any) => void): import("rxjs").OperatorFunction<Object, any> {
  throw new Error('Function not implemented.');
}
 