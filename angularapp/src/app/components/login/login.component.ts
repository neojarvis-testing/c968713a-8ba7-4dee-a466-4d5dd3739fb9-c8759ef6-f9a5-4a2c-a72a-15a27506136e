import { Component } from '@angular/core';

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
      console.log('Logging in with:', this.logindto);
      // Add your authentication logic here
    } else {
      console.log('Please fill in all required fields.');
    }
  }
}