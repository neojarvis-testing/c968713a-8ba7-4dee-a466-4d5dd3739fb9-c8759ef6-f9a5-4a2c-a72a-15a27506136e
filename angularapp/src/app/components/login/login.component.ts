import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Injectable({
  providedIn:'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logindto = {
    Email: '',
    Password: ''
  };
 
  constructor(private services:AuthService,private router:Router)
  {}
  showPassword: boolean = false; // To toggle password visibility

  // Function to calculate password strength
  calculateStrength(password: string): string {
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    const mediumRegex = new RegExp(
      '^((?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[0-9])|(?=.*[A-Z])(?=.*[0-9]))(?=.{6,})'
    );

    if (strongRegex.test(password)) {
      return 'Strong';
    } else if (mediumRegex.test(password)) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  }

  // Simulated login function
  login(): void {
    if (this.logindto.Email && this.logindto.Password) {
        
      this.services.login(this.logindto).subscribe(res=>{
         alert("Login Successfull");
      })


      // Add your authentication logic here
    } else {
      console.log('Please fill in all required fields.');
    }
  }
}