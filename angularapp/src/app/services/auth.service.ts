
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  // private apiUrl = 'https://8080-baecbebeaafaffbefadcceffaacaaae.premiumproject.examly.io/api';

  private apiUrl = 'https://8080-ceeabaaafcbadfbfdaaedceffaacaaae.premiumproject.examly.io/api';


  private currentUserRole = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.currentUserRole.next(this.getUserRoleFromToken(token));
    }
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.apiUrl}/login`, credentials).subscribe(
        response => {
          localStorage.setItem('token', response.token);
          const role = this.getUserRoleFromToken(response.token);
          console.log("Decoded Role:", role); // Logging for debugging
          const userId = this.getUserIdFromToken(response.token); // Extracting UserId
          console.log("UserId:", userId); // Logging for debugging
          localStorage.setItem('userRole', role);
          localStorage.setItem('userId', userId); // Storing UserId in local storage
          this.currentUserRole.next(role);
          observer.next(response);
          observer.complete();
        },
        error => {
          console.log("Error at AuthService");
          observer.error(error);
        }
      );
    });
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId'); // Removing UserId from local storage
    this.currentUserRole.next(null);
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  public getUserRoleFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      console.log("Decoded Payload:", payload); // Log payload for debugging

      // Log all fields in the payload to verify the structure
      Object.keys(payload).forEach(key => {
        console.log(`${key}: ${payload[key]}`);
      });

      // Extract the UserRole from common claim URIs
      const role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log("Extracted Role:", role);
      return role || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  public getUserIdFromToken(token: string): string {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      console.log("Decoded Payload:", payload); // Log payload for debugging

      // Log all fields in the payload to verify the structure
      Object.keys(payload).forEach(key => {
        console.log(`${key}: ${payload[key]}`);
      });

      // Extract the UserId from common claim URIs
      const userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      console.log("Extracted UserId:", userId);
      return userId || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  getCurrentUserRole(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'Admin';
  }

  isUser(): boolean {
    const role = this.getUserRole();
    return role === 'User';
  }
}

