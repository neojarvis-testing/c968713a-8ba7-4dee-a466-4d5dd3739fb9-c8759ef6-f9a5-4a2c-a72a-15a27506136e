
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { User } from 'src/app/models/user.model';
 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationData: User = {
    Username: '',
    Email: '',
    Password: '',
    MobileNumber: '',
    UserRole: '',
    UserId: 0 // Update to match expected backend field
  };
  confirmPassword: string = '';
  isPasswordStrong: boolean = false;
  passwordError = '';
  isConfirm: boolean = false;
  error = '';
 
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
 
  constructor(private authService: AuthService, private router: Router) { }
 
  ngOnInit(): void { }
 
  validatePassword() {
    const password = this.registrationData.Password;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    this.isPasswordStrong = regex.test(password);
 
    if (!this.isPasswordStrong) {
      this.passwordError = "Password must contain at least one uppercase, one lowercase, one number, one special character, and be at least 8 characters long.";
    } else {
      this.passwordError = '';
    }
  }
 
  passwordMatch() {
    if (this.registrationData.Password !== this.confirmPassword) {
      this.isConfirm = false;
      this.error = "*Passwords do not match";
    } else {
      this.isConfirm = true;
      this.error = '';
    }
  }
 
  validateEmail() {
    const email = this.registrationData.Email;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
 
 
    validateMobileNumber() {
        const mobileNumber = this.registrationData.MobileNumber;
        const regex = /^[6-9]\d{9}$/; // Indian mobile numbers start with 6-9 and are 10 digits long
        return regex.test(mobileNumber);
      }
   
 
  onRegister() {
    if (!this.validateEmail()) {
      alert('Invalid email format');
      return;
    }
 
    if (!this.validateMobileNumber()) {
      alert('Mobile number must be 10 digits');
      return;
    }
    if (!this.isPasswordStrong) {
      alert("Password must contain at least one uppercase, one lowercase, one number, one special character, and be at least 8 characters long.");
      return;
    }
 
    if (this.registrationData.Password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
 
    console.log('Registration Data:', this.registrationData); // Debugging: Log the registration data
    console.log('Role Value:', this.registrationData.UserRole); // Debugging: Log the role value
 
    this.authService.register(this.registrationData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
 
        // Show SweetAlert2 success message
        Swal.fire({
          title: 'Registration Successful',
          text: 'You have successfully registered!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        console.error('Registration failed', err);
        if (err.error && err.error.errors) {
          console.log('Validation Errors:', err.error.errors);
          alert(`Registration failed: ${JSON.stringify(err.error.errors)}`);
        } else {
          alert('Registration failed. Please check your input and try again.');
        }
      }
    });
  }
 
  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    } else if (field === 'confirmPassword') {
      this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
    }
  }
}